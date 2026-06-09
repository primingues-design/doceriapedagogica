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
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return NextResponse.json({ error: 'ANTHROPIC_API_KEY não configurada' }, { status: 500 });

  const authHeader = request.headers.get('authorization') || '';
  const token = authHeader.replace(/^Bearer\s+/i, '');
  if (!token) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });

  const decoded = decodeJwt(token);
  const userId = decoded?.sub;
  if (!userId) return NextResponse.json({ error: 'Token inválido' }, { status: 401 });

  if (!SUPA_KEY()) return NextResponse.json({ error: 'Servidor não configurado' }, { status: 500 });

  const profileRes = await supaFetch(
    `/profiles?id=eq.${userId}&select=plan,credits,credits_reset_at,created_at`
  );
  const profiles = await profileRes.json();
  const profile = profiles?.[0];
  if (!profile) return NextResponse.json({ error: 'Perfil não encontrado' }, { status: 404 });

  const plan: string = profile.plan || 'Free';
  let credits: number = profile.credits ?? 10;

  const PLAN_MONTHLY_CREDITS: Record<string, number> = { Pro: 40, Escola: 400 };

  if (plan === 'Free') {
    const refDate = profile.credits_reset_at || profile.created_at;
    if (refDate) {
      const daysSince = (Date.now() - new Date(refDate).getTime()) / 86_400_000;
      if (daysSince >= 30) {
        credits = 5;
        await supaFetch(`/profiles?id=eq.${userId}`, {
          method: 'PATCH',
          headers: { Prefer: 'return=minimal' },
          body: JSON.stringify({ credits: 5, credits_reset_at: new Date().toISOString() }),
        });
      }
    }
  } else if (plan in PLAN_MONTHLY_CREDITS) {
    const monthlyLimit = PLAN_MONTHLY_CREDITS[plan];
    const refDate = profile.credits_reset_at;

    if (!refDate) {
      // Primeiro acesso pago sem data de reset — inicia o ciclo e corrige legado (ex: 999 créditos)
      if (credits > monthlyLimit) credits = monthlyLimit;
      await supaFetch(`/profiles?id=eq.${userId}`, {
        method: 'PATCH',
        headers: { Prefer: 'return=minimal' },
        body: JSON.stringify({ credits, credits_reset_at: new Date().toISOString() }),
      });
    } else {
      const daysSince = (Date.now() - new Date(refDate).getTime()) / 86_400_000;
      if (daysSince >= 30) {
        credits = monthlyLimit;
        await supaFetch(`/profiles?id=eq.${userId}`, {
          method: 'PATCH',
          headers: { Prefer: 'return=minimal' },
          body: JSON.stringify({ credits: monthlyLimit, credits_reset_at: new Date().toISOString() }),
        });
      }
    }
  }

  if (credits <= 0) {
    return NextResponse.json({ error: 'Sem créditos disponíveis', upgrade: true }, { status: 402 });
  }

  await supaFetch(`/profiles?id=eq.${userId}`, {
    method: 'PATCH',
    headers: { Prefer: 'return=minimal' },
    body: JSON.stringify({ credits: credits - 1 }),
  });

  const body = await request.json();

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      await supaFetch(`/profiles?id=eq.${userId}`, {
        method: 'PATCH',
        headers: { Prefer: 'return=minimal' },
        body: JSON.stringify({ credits }),
      });
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data, {
      status: 200,
      headers: { 'X-Credits-Remaining': String(credits - 1) },
    });
  } catch (e) {
    await supaFetch(`/profiles?id=eq.${userId}`, {
      method: 'PATCH',
      headers: { Prefer: 'return=minimal' },
      body: JSON.stringify({ credits }),
    });
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
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
