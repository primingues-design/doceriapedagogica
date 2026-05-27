module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido' });

  const { productId, email, userId } = req.body || {};
  if (!productId || !userId) return res.status(400).json({ error: 'Parâmetros obrigatórios ausentes' });

  const PRODUCTS = {
    plan_pro_mensal: { title: 'DoceriaPedagógica Pro — 1 mês (lançamento)', price: 19.90 },
    plan_escola:     { title: 'DoceriaPedagógica Escola — 1 mês (10 professores)',  price: 179.90 },
    pack_10:         { title: '10 créditos extras — DoceriaPedagógica',  price: 9.90  },
    pack_30:         { title: '30 créditos extras — DoceriaPedagógica',  price: 24.90 },
    pack_60:         { title: '60 créditos extras — DoceriaPedagógica',  price: 44.90 },
    pack_120:        { title: '120 créditos extras — DoceriaPedagógica', price: 79.90 },
  };

  const product = PRODUCTS[productId];
  if (!product) return res.status(400).json({ error: 'Produto inválido' });

  const token = process.env.MP_ACCESS_TOKEN;
  if (!token) return res.status(500).json({ error: 'MP não configurado' });

  const base = process.env.APP_URL || 'https://doceriapedagogica.vercel.app';

  try {
    const r = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        items: [{
          id: productId,
          title: product.title,
          quantity: 1,
          unit_price: product.price,
          currency_id: 'BRL',
        }],
        payer: { email: email || '' },
        back_urls: {
          success: `${base}/pagamento-sucesso.html`,
          failure: `${base}/pagamento-erro.html`,
          pending: `${base}/pagamento-pendente.html`,
        },
        auto_return: 'approved',
        notification_url: `${base}/api/mp-webhook`,
        external_reference: `${userId}|${productId}`,
        statement_descriptor: 'DOCERIA PEDAGOGICA',
        expires: false,
      }),
    });

    const data = await r.json();
    if (!r.ok) {
      console.error('MP error:', data);
      return res.status(r.status).json({ error: data.message || 'Erro no Mercado Pago' });
    }

    return res.status(200).json({ init_point: data.init_point, preference_id: data.id });
  } catch (e) {
    console.error('mp-checkout error:', e);
    return res.status(500).json({ error: e.message });
  }
};
