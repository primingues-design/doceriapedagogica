import { NextRequest, NextResponse } from 'next/server';

// Decodifica o payload do JWT (apenas para confirmar que há um usuário logado).
function decodeJwt(token: string): { sub?: string } | null {
  try {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const key = process.env.PEXELS_API_KEY;
  if (!key) return NextResponse.json({ error: 'PEXELS_API_KEY não configurada' }, { status: 500 });

  // Gate simples: só usuários logados (evita abuso da cota do Pexels).
  const authHeader = request.headers.get('authorization') || '';
  const token = authHeader.replace(/^Bearer\s+/i, '');
  if (!token || !decodeJwt(token)?.sub) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  const query = (request.nextUrl.searchParams.get('query') || '').trim();
  if (!query) return NextResponse.json({ url: null, error: 'query obrigatória' }, { status: 400 });

  const orientation = request.nextUrl.searchParams.get('orientation') || 'landscape';

  try {
    const r = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=${encodeURIComponent(orientation)}`,
      { headers: { Authorization: key } }
    );
    // Falha do Pexels não quebra a geração — o cliente cai no emoji de fallback.
    if (!r.ok) return NextResponse.json({ url: null }, { status: 200 });

    const data = await r.json();
    const photo = data?.photos?.[0];
    const url = photo?.src?.large2x || photo?.src?.large || photo?.src?.medium || null;
    return NextResponse.json({ url, alt: photo?.alt || '' }, { status: 200 });
  } catch {
    return NextResponse.json({ url: null }, { status: 200 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
