module.exports = async (req, res) => {
  // MP always expects 200 back — never return error status
  if (req.method !== 'POST') { res.status(200).end(); return; }

  const { type, data } = req.body || {};

  // Only handle payment notifications
  if (type !== 'payment' || !data?.id) { res.status(200).end(); return; }

  const token   = process.env.MP_ACCESS_TOKEN;
  const supaUrl = process.env.SUPABASE_URL || 'https://atkwvwhwbkerezdmipxw.supabase.co';
  const supaKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  try {
    // 1. Fetch full payment details from MP
    const r = await fetch(`https://api.mercadopago.com/v1/payments/${data.id}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    const payment = await r.json();

    // Only act on approved payments
    if (payment.status !== 'approved') { res.status(200).end(); return; }

    // 2. Parse external_reference: "userId|productId"
    const [userId, productId] = (payment.external_reference || '').split('|');
    if (!userId || !productId) { res.status(200).end(); return; }

    // 3. Determine what to grant
    const GRANTS = {
      plan_pro_mensal: { plan: 'Pro',    credits: 999, days: 31 },
      plan_escola:     { plan: 'Escola', credits: 999, days: 31 },
      pack_10:         { addCredits: 10  },
      pack_30:         { addCredits: 30  },
      pack_60:         { addCredits: 60  },
      pack_120:        { addCredits: 120 },
    };

    const grant = GRANTS[productId];
    if (!grant) { res.status(200).end(); return; }

    const headers = {
      'Content-Type': 'application/json',
      'apikey': supaKey,
      'Authorization': `Bearer ${supaKey}`,
    };

    let update = { mp_payment_id: String(data.id) };

    if (grant.plan) {
      // Plan upgrade
      const expiresAt = new Date(Date.now() + grant.days * 86_400_000).toISOString();
      update = { ...update, plan: grant.plan, plan_expires_at: expiresAt, credits: grant.credits };
    } else {
      // Credit pack — fetch current credits first
      const getR = await fetch(
        `${supaUrl}/rest/v1/profiles?id=eq.${userId}&select=credits`,
        { headers }
      );
      const rows = await getR.json();
      const current = rows?.[0]?.credits ?? 0;
      update = { ...update, credits: current + grant.addCredits };
    }

    // 4. Update Supabase profile
    await fetch(`${supaUrl}/rest/v1/profiles?id=eq.${userId}`, {
      method: 'PATCH',
      headers: { ...headers, 'Prefer': 'return=minimal' },
      body: JSON.stringify(update),
    });

    res.status(200).end();
  } catch (e) {
    console.error('mp-webhook error:', e);
    res.status(200).end(); // Always 200 so MP doesn't retry endlessly
  }
};
