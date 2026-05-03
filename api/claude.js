module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const anthropicApiKey = process.env.ANTHROPIC_API_KEY;

  if (!anthropicApiKey) {
    console.error('ANTHROPIC_API_KEY nao configurada.');
    return res.status(500).json({ error: 'Chave da API Anthropic nao configurada' });
  }

  try {
    const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': anthropicApiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(req.body)
    });

    if (!anthropicResponse.ok) {
      const errorData = await anthropicResponse.json();
      console.error('Erro da API Anthropic:', errorData);
      return res.status(anthropicResponse.status).json(errorData);
    }

    const data = await anthropicResponse.json();
    res.status(200).json(data);

  } catch (error) {
    console.error('Erro na serverless function:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};
