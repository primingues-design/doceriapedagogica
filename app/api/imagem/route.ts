import { NextRequest, NextResponse } from 'next/server';

// Confirma apenas que há um usuário logado (gate contra abuso da cota).
function decodeJwt(token: string): { sub?: string } | null {
  try {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  } catch {
    return null;
  }
}

// Tamanhos aceitos pelo fal.ai (Flux)
const SIZES = new Set([
  'square_hd', 'square', 'portrait_4_3', 'portrait_16_9',
  'landscape_4_3', 'landscape_16_9',
]);

export async function POST(request: NextRequest) {
  const key = process.env.FAL_KEY;
  if (!key) return NextResponse.json({ url: null, error: 'FAL_KEY não configurada' }, { status: 500 });

  const authHeader = request.headers.get('authorization') || '';
  const token = authHeader.replace(/^Bearer\s+/i, '');
  if (!token || !decodeJwt(token)?.sub) {
    return NextResponse.json({ url: null, error: 'Não autenticado' }, { status: 401 });
  }

  let body: { prompt?: string; size?: string };
  try { body = await request.json(); } catch { return NextResponse.json({ url: null, error: 'Body inválido' }, { status: 400 }); }

  const prompt = (body.prompt || '').trim();
  if (!prompt) return NextResponse.json({ url: null, error: 'prompt obrigatório' }, { status: 400 });
  const image_size = SIZES.has(body.size || '') ? body.size : 'square_hd';

  try {
    // Flux schnell: rápido e barato. fal.run é o endpoint síncrono.
    const r = await fetch('https://fal.run/fal-ai/flux/schnell', {
      method: 'POST',
      headers: { 'Authorization': `Key ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt,
        image_size,
        num_images: 1,
        num_inference_steps: 4,
        enable_safety_checker: true,
      }),
    });

    // Falha não quebra a geração — o cliente cai no placeholder.
    if (!r.ok) return NextResponse.json({ url: null }, { status: 200 });

    const data = await r.json();
    const url = data?.images?.[0]?.url || null;
    return NextResponse.json({ url }, { status: 200 });
  } catch {
    return NextResponse.json({ url: null }, { status: 200 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
