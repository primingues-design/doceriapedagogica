// Cobrança de créditos — usada pela IA (/api/claude) e pelas atividades prontas das centrais (/api/consumir).
import type { VerifiedUser } from '@/lib/verifyUser';

const SUPA_URL = process.env.SUPABASE_URL || 'https://atkwvwhwbkerezdmipxw.supabase.co';
export const SUPA_KEY = () => process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Contas-criadoras: uso ilimitado (não checa nem desconta crédito).
// Padrão com os e-mails da fundadora; pode somar outros via env CREATOR_EMAILS (separados por vírgula).
const CREATOR_EMAILS = (process.env.CREATOR_EMAILS || 'professorapriscila2006@gmail.com,primingues@gmail.com,crissmuniz@gmail.com')
  .toLowerCase().split(',').map((s) => s.trim()).filter(Boolean);
export const isCreatorEmail = (email: string) => CREATOR_EMAILS.includes(String(email || '').toLowerCase());

/* ── Créditos grátis ──
   anonimo: entra sem cadastro e experimenta · bonusEmail: ao colocar o e-mail (mesma conta)
   cadastro: quem se cadastra direto pelo e-mail · semanal: renova se zerar (a cada 7 dias)    */
export const CRED = { anonimo: 3, bonusEmail: 2, cadastro: 5, semanal: 1, novosDesde: '2026-10-19' } as const;

const PLAN_MONTHLY_CREDITS: Record<string, number> = { Pro: 40, Escola: 400 };

export async function supaFetch(path: string, options: RequestInit = {}) {
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

export type Cobranca =
  | { ok: true; isCreator: boolean; restante: number | null; devolver: () => Promise<void> }
  | { ok: false; status: number; body: Record<string, unknown> };

/** Confere o saldo (aplicando bônus/renovações) e desconta `custo`. Em caso de falha depois, chame devolver(). */
export async function cobrar(user: VerifiedUser, custo: number): Promise<Cobranca> {
  const userId = user.id;
  const email = user.email;
  const ilimitado: Cobranca = { ok: true, isCreator: true, restante: null, devolver: async () => {} };
  if (CREATOR_EMAILS.includes(email)) return ilimitado;

  if (!SUPA_KEY()) return { ok: false, status: 500, body: { error: 'Servidor não configurado' } };

  const profileRes = await supaFetch(
    `/profiles?id=eq.${userId}&select=plan,credits,credits_reset_at,created_at,is_creator`
  );
  const profiles = await profileRes.json();
  let profile = profiles?.[0];
  if (!profile) {
    // Perfil ainda não existe (trigger que não rodou / RLS que bloqueou o insert no cliente).
    // Cria aqui com a service role (ignora RLS): visitante anônimo começa com 3, cadastro com 5.
    const nome = (email && email.split('@')[0]) || (user.isAnonymous ? 'Visitante' : 'Professor(a)');
    await supaFetch('/profiles', {
      method: 'POST',
      headers: { Prefer: 'return=minimal' },
      body: JSON.stringify(user.isAnonymous
        ? { id: userId, nome, nivel: '', plan: 'Anonimo', credits: CRED.anonimo }
        : { id: userId, nome, nivel: '', plan: 'Free', credits: CRED.cadastro, credits_reset_at: new Date().toISOString() }),
    }).catch(() => {});
    const reRes = await supaFetch(`/profiles?id=eq.${userId}&select=plan,credits,credits_reset_at,created_at,is_creator`);
    const reArr = await reRes.json().catch(() => []);
    profile = reArr?.[0];
    if (!profile) return { ok: false, status: 404, body: { error: 'Perfil não encontrado' } };
  }

  if (profile.is_creator) return ilimitado;

  let plan: string = profile.plan || 'Free';
  let credits: number = profile.credits ?? CRED.cadastro;
  const agora = new Date().toISOString();
  const salvar = (campos: Record<string, unknown>) => supaFetch(`/profiles?id=eq.${userId}`, {
    method: 'PATCH', headers: { Prefer: 'return=minimal' }, body: JSON.stringify(campos),
  });

  if (user.isAnonymous) {
    // Visitante sem cadastro: 3 para experimentar (o trigger do banco cria o perfil
    // como 'Free'; no 1º uso ele vira 'Anonimo' com no máximo 3). Não renova.
    if (plan !== 'Anonimo') {
      plan = 'Anonimo';
      credits = Math.min(credits, CRED.anonimo);
      await salvar({ plan, credits });
    }
    if (credits < custo) {
      // a página mostra "coloque seu e-mail para continuar" (ganha +2)
      return { ok: false, status: 402, body: { error: 'Seus materiais grátis acabaram', precisaEmail: true, bonusEmail: CRED.bonusEmail } };
    }
  } else if (plan === 'Anonimo') {
    // Era visitante e acabou de colocar o e-mail (mesma conta): vira 'Free' e ganha o bônus.
    plan = 'Free';
    credits += CRED.bonusEmail;
    await salvar({ plan, credits, credits_reset_at: agora });
  } else if (plan === 'Free') {
    // Cadastros novos (a partir desta mudança) começam com no máximo 5 grátis.
    // (Só se o saldo ainda for o padrão do banco — nunca mexe em crédito comprado.)
    if (!profile.credits_reset_at && profile.created_at >= CRED.novosDesde && credits <= 10 && credits > CRED.cadastro) {
      credits = CRED.cadastro;
      await salvar({ credits, credits_reset_at: agora });
    }
    // Renovação semanal: quem está sem crédito ganha 1 grátis a cada 7 dias.
    const refDate = profile.credits_reset_at || profile.created_at;
    if (refDate && credits < 1) {
      const daysSince = (Date.now() - new Date(refDate).getTime()) / 86_400_000;
      if (daysSince >= 7) {
        credits = CRED.semanal;
        await salvar({ credits, credits_reset_at: agora });
      }
    }
  } else if (plan in PLAN_MONTHLY_CREDITS) {
    const monthlyLimit = PLAN_MONTHLY_CREDITS[plan];
    const refDate = profile.credits_reset_at;
    if (!refDate) {
      // Primeiro acesso pago sem data de reset — inicia o ciclo e corrige legado (ex: 999 créditos)
      if (credits > monthlyLimit) credits = monthlyLimit;
      await salvar({ credits, credits_reset_at: agora });
    } else {
      const daysSince = (Date.now() - new Date(refDate).getTime()) / 86_400_000;
      if (daysSince >= 30) {
        credits = monthlyLimit;
        await salvar({ credits: monthlyLimit, credits_reset_at: agora });
      }
    }
  }

  if (credits < custo) {
    return { ok: false, status: 402, body: { error: 'Sem créditos disponíveis', upgrade: true, semanal: plan === 'Free' } };
  }

  await salvar({ credits: credits - custo });
  const antes = credits;
  return { ok: true, isCreator: false, restante: credits - custo, devolver: async () => { await salvar({ credits: antes }); } };
}
