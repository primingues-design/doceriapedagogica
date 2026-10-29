import { NextRequest, NextResponse } from 'next/server';
import { tokenFrom, verifyUser } from '@/lib/verifyUser';
import { isCreatorEmail, supaFetch, SUPA_KEY } from '@/lib/creditos';

// Painel da criadora (/painel.html): números da Doceria somados AQUI no servidor.
// Só responde para os e-mails de criadora; o navegador recebe apenas totais
// (e os últimos cadastros com e-mail), nunca a lista completa de usuários.
const SUPA_URL = process.env.SUPABASE_URL || 'https://atkwvwhwbkerezdmipxw.supabase.co';
const DIA = 86_400_000;

type AuthUser = { id: string; email?: string; is_anonymous?: boolean; created_at: string; last_sign_in_at?: string | null };

async function todosUsuarios(): Promise<AuthUser[]> {
  const key = SUPA_KEY();
  const out: AuthUser[] = [];
  for (let page = 1; page <= 50; page++) {
    const r = await fetch(`${SUPA_URL}/auth/v1/admin/users?page=${page}&per_page=1000`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` }, cache: 'no-store',
    });
    if (!r.ok) throw new Error(`auth ${r.status}`);
    const j = await r.json();
    const lista: AuthUser[] = j.users || [];
    out.push(...lista);
    if (lista.length < 1000) break;
  }
  return out;
}

// dia no fuso de Brasília (AAAA-MM-DD)
const diaBR = (iso: string) => new Date(new Date(iso).getTime() - 3 * 3_600_000).toISOString().slice(0, 10);

export async function GET(request: NextRequest) {
  const token = tokenFrom(request.headers.get('authorization'));
  if (!token) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  const user = await verifyUser(token);
  if (!user) return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
  if (!isCreatorEmail(user.email)) return NextResponse.json({ error: 'Acesso restrito' }, { status: 403 });
  if (!SUPA_KEY()) return NextResponse.json({ error: 'Servidor não configurado' }, { status: 500 });

  try {
    const agora = Date.now();
    const desde30 = new Date(agora - 30 * DIA).toISOString();
    const [users, profRes, ativRes] = await Promise.all([
      todosUsuarios(),
      supaFetch('/profiles?select=id,plan,mp_payment_id'),
      supaFetch(`/atividades_salvas?select=tipo,created_at&created_at=gte.${desde30}&limit=10000`),
    ]);
    // se a coluna mp_payment_id não existir, lê só o plano
    const profOk = profRes.ok ? profRes : await supaFetch('/profiles?select=id,plan');
    const profiles: { id: string; plan?: string; mp_payment_id?: string | null }[] = profOk.ok ? await profOk.json() : [];
    const ativs: { tipo: string; created_at: string }[] = ativRes.ok ? await ativRes.json() : [];

    // as contas de criadora não entram nos números
    const criadoras = new Set(users.filter((u) => isCreatorEmail(u.email || '')).map((u) => u.id));
    const reais = users.filter((u) => !criadoras.has(u.id));
    const anon = reais.filter((u) => u.is_anonymous);
    const comEmail = reais.filter((u) => !u.is_anonymous);
    const ativos7 = reais.filter((u) => u.last_sign_in_at && agora - new Date(u.last_sign_in_at).getTime() < 7 * DIA).length;

    // novos por dia (últimos 30 dias): visitantes sem cadastro x cadastros com e-mail
    const dias: { dia: string; anon: number; email: number }[] = [];
    for (let i = 29; i >= 0; i--) dias.push({ dia: diaBR(new Date(agora - i * DIA).toISOString()), anon: 0, email: 0 });
    const porDia = new Map(dias.map((d) => [d.dia, d]));
    for (const u of reais) {
      const d = porDia.get(diaBR(u.created_at));
      if (!d) continue;
      if (u.is_anonymous) d.anon++;
      else d.email++;
    }

    const perfis = profiles.filter((p) => !criadoras.has(p.id));
    const pagantes = perfis.filter((p) => p.mp_payment_id).length;
    const planos: Record<string, number> = {};
    for (const p of perfis) planos[p.plan || 'Free'] = (planos[p.plan || 'Free'] || 0) + 1;

    const tipos: Record<string, number> = {};
    for (const a of ativs) tipos[a.tipo || 'outro'] = (tipos[a.tipo || 'outro'] || 0) + 1;

    const recentes = comEmail
      .sort((a, b) => b.created_at.localeCompare(a.created_at))
      .slice(0, 10)
      .map((u) => ({ email: u.email || '', criado: u.created_at, ultimo: u.last_sign_in_at || null }));

    return NextResponse.json({
      geradoEm: new Date().toISOString(),
      totais: { usuarios: reais.length, anonimos: anon.length, comEmail: comEmail.length, ativos7, pagantes },
      planos, dias, materiais30: { total: ativs.length, tipos }, recentes,
    }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (e) {
    console.error('painel:', e);
    return NextResponse.json({ error: 'Não foi possível ler os dados agora.' }, { status: 502 });
  }
}
