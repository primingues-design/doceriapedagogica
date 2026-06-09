import { NextRequest, NextResponse } from 'next/server';

const SUPA_URL = process.env.SUPABASE_URL || 'https://atkwvwhwbkerezdmipxw.supabase.co';
const SUPA_KEY = () => process.env.SUPABASE_SERVICE_ROLE_KEY || '';

function decodeJwt(token: string): { sub?: string } | null {
  try {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  } catch {
    return null;
  }
}

async function supaFetch(path: string, options: RequestInit = {}) {
  const key = SUPA_KEY();
  return fetch(`${SUPA_URL}/rest/v1${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      apikey: key,
      Authorization: `Bearer ${key}`,
      ...(options.headers || {}),
    },
  });
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization') || '';
  const token = authHeader.replace(/^Bearer\s+/i, '');
  if (!token) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });

  const decoded = decodeJwt(token);
  const userId = decoded?.sub;
  if (!userId) return NextResponse.json({ error: 'Token inválido' }, { status: 401 });

  if (!SUPA_KEY()) return NextResponse.json({ error: 'Servidor não configurado' }, { status: 500 });

  let body: { tipo?: string; tema?: string; nivel?: string; titulo?: string; conteudo_html?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Body inválido' }, { status: 400 });
  }

  const { tipo = '', tema = '', nivel = '', titulo = '', conteudo_html = '' } = body;

  if (!conteudo_html) return NextResponse.json({ error: 'conteudo_html obrigatório' }, { status: 400 });

  const res = await supaFetch('/atividades_salvas', {
    method: 'POST',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify({ user_id: userId, tipo, tema, nivel, titulo, conteudo_html }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    return NextResponse.json({ error: err.message || 'Erro ao salvar' }, { status: res.status });
  }

  const data = await res.json();
  const savedId = data?.[0]?.id;

  // Incrementa total_materials no perfil (fire-and-forget)
  try {
    const profRes = await supaFetch(`/profiles?id=eq.${userId}&select=total_materials`);
    const profs = await profRes.json();
    const current = profs?.[0]?.total_materials ?? 0;
    await supaFetch(`/profiles?id=eq.${userId}`, {
      method: 'PATCH',
      headers: { Prefer: 'return=minimal' },
      body: JSON.stringify({ total_materials: current + 1 }),
    });
  } catch (_) {}

  return NextResponse.json({ id: savedId }, { status: 201 });
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
