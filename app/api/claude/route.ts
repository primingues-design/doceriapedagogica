import { NextRequest, NextResponse } from 'next/server';
import { tokenFrom, verifyUser } from '@/lib/verifyUser';

const SUPA_URL = process.env.SUPABASE_URL || 'https://atkwvwhwbkerezdmipxw.supabase.co';
const SUPA_KEY = () => process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Contas-criadoras: geração ilimitada (não checa nem desconta crédito).
// Padrão com os e-mails da fundadora; pode somar outros via env CREATOR_EMAILS (separados por vírgula).
const CREATOR_EMAILS = (process.env.CREATOR_EMAILS || 'professorapriscila2006@gmail.com,primingues@gmail.com,crissmuniz@gmail.com')
  .toLowerCase().split(',').map((s) => s.trim()).filter(Boolean);

/* ── Créditos grátis ──
   anonimo: entra sem cadastro e experimenta · bonusEmail: ao colocar o e-mail (mesma conta)
   cadastro: quem se cadastra direto pelo e-mail · semanal: renova se zerar (a cada 7 dias)    */
const CRED = { anonimo: 3, bonusEmail: 2, cadastro: 5, semanal: 1, novosDesde: '2026-10-19' } as const;

/* ── Modelos de IA (preços por milhão de tokens: entrada / saída) ──
   completo: Claude Sonnet 5.5 (US$ 2 / 10) — atividades, avaliações, apostilas, planos, slides
   rapido:   Claude Haiku 5.5  (US$ 0,10 / 0,50) — jogos, caça-palavras, cruzadinha, quiz        */
const MODELOS = {
  completo: { model: 'claude-sonnet-5-5', effort: 'medium', folga: 8000, fallback: true },
  rapido:   { model: 'claude-haiku-5-5',  effort: 'low',    folga: 4000, fallback: false },
} as const;
// páginas de geração simples → modelo rápido e barato (o resto usa o completo)
const PAGINAS_RAPIDAS = ['jogos.html', 'memoria.html', 'trilha.html', 'palavras.html', 'interativo.html',
  'ingles-jogo.html', 'cacapalavras-print.html', 'cruzadinha-print.html', '/professor/caca-palavras', '/professor/cruzadinha'];
function escolherTier(referer: string | null): keyof typeof MODELOS {
  try {
    const p = new URL(referer || '').pathname;
    return PAGINAS_RAPIDAS.some((x) => p.endsWith(x) || p.startsWith(x)) ? 'rapido' : 'completo';
  } catch {
    return 'completo';
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

  const token = tokenFrom(request.headers.get('authorization'));
  if (!token) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });

  // Token conferido no Supabase (assinatura + validade) — id/e-mail vêm do servidor, não do token.
  const user = await verifyUser(token);
  if (!user) return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
  const userId = user.id;
  const email = user.email;
  let isCreator = CREATOR_EMAILS.includes(email);

  const body = await request.json();
  // Custo em créditos por geração (padrão 1). Páginas mais pesadas (ex.: apostila
  // sazonal da Copa) mandam creditCost:2. Trava server-side entre 1 e 3 para o
  // cliente não conseguir burlar pedindo custo 0 ou negativo.
  const creditCost = Math.min(Math.max(parseInt(body?.creditCost, 10) || 1, 1), 3);

  let credits = 0;

  if (!isCreator) {
    if (!SUPA_KEY()) return NextResponse.json({ error: 'Servidor não configurado' }, { status: 500 });

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
      if (!profile) return NextResponse.json({ error: 'Perfil não encontrado' }, { status: 404 });
    }

    if (profile.is_creator) {
      isCreator = true;
    } else {
    let plan: string = profile.plan || 'Free';
    credits = profile.credits ?? CRED.cadastro;
    const agora = new Date().toISOString();
    const salvar = (campos: Record<string, unknown>) => supaFetch(`/profiles?id=eq.${userId}`, {
      method: 'PATCH', headers: { Prefer: 'return=minimal' }, body: JSON.stringify(campos),
    });

    const PLAN_MONTHLY_CREDITS: Record<string, number> = { Pro: 40, Escola: 400 };

    if (user.isAnonymous) {
      // Visitante sem cadastro: 3 gerações para experimentar (o trigger do banco cria o perfil
      // como 'Free'; na 1ª geração ele vira 'Anonimo' com no máximo 3). Não renova.
      if (plan !== 'Anonimo') {
        plan = 'Anonimo';
        credits = Math.min(credits, CRED.anonimo);
        await salvar({ plan, credits });
      }
      if (credits < creditCost) {
        // a página mostra "coloque seu e-mail para continuar" (ganha +2)
        return NextResponse.json({ error: 'Suas gerações grátis acabaram', precisaEmail: true, bonusEmail: CRED.bonusEmail }, { status: 402 });
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
      // Renovação semanal: quem está sem crédito ganha 1 geração grátis a cada 7 dias.
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

    if (credits < creditCost) {
      return NextResponse.json({ error: 'Sem créditos disponíveis', upgrade: true, semanal: plan === 'Free' }, { status: 402 });
    }

    await supaFetch(`/profiles?id=eq.${userId}`, {
      method: 'PATCH',
      headers: { Prefer: 'return=minimal' },
      body: JSON.stringify({ credits: credits - creditCost }),
    });
    } // end else (not is_creator)
  }

  // O MODELO é escolhido aqui (o que a página mandar é ignorado): troca o site todo num lugar só
  // e impede que alguém peça um modelo caro direto do navegador.
  const tier = escolherTier(request.headers.get('referer'));
  const cfg = MODELOS[tier];
  const pedidoMax = Math.min(Math.max(parseInt(body?.max_tokens, 10) || 2000, 256), 8000);
  const anthropicBody: Record<string, unknown> = {
    model: cfg.model,
    // folga: nos modelos novos o raciocínio interno também conta no limite de tokens
    max_tokens: pedidoMax + cfg.folga,
    output_config: { effort: cfg.effort },
    messages: body?.messages,
    ...(body?.system ? { system: body.system } : {}),
    ...(body?.stop_sequences ? { stop_sequences: body.stop_sequences } : {}),
    ...(cfg.fallback ? { fallbacks: 'default' } : {}),
  };

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        ...(cfg.fallback ? { 'anthropic-beta': 'server-side-fallback-2026-07-01' } : {}),
      },
      body: JSON.stringify(anthropicBody),
    });

    const data = await response.json();

    // Recusa de segurança (raro em conteúdo escolar): devolve o crédito e explica.
    if (response.ok && data?.stop_reason === 'refusal') {
      if (!isCreator) {
        await supaFetch(`/profiles?id=eq.${userId}`, {
          method: 'PATCH',
          headers: { Prefer: 'return=minimal' },
          body: JSON.stringify({ credits }),
        });
      }
      return NextResponse.json({ error: 'A IA não conseguiu gerar este material. Tente reformular o pedido.' }, { status: 422 });
    }

    // As páginas leem data.content[0].text: devolve só o TEXTO final (sem blocos de raciocínio),
    // no mesmo formato de antes — nenhuma página precisa mudar.
    if (response.ok && Array.isArray(data?.content)) {
      const texto = data.content.filter((b: { type?: string }) => b.type === 'text').map((b: { text?: string }) => b.text || '').join('');
      data.content = [{ type: 'text', text: texto }];
    }

    if (!response.ok) {
      if (!isCreator) {
        await supaFetch(`/profiles?id=eq.${userId}`, {
          method: 'PATCH',
          headers: { Prefer: 'return=minimal' },
          body: JSON.stringify({ credits }),
        });
      }
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data, {
      status: 200,
      headers: { 'X-Credits-Remaining': isCreator ? 'ilimitado' : String(credits - creditCost) },
    });
  } catch (e) {
    if (!isCreator) {
      await supaFetch(`/profiles?id=eq.${userId}`, {
        method: 'PATCH',
        headers: { Prefer: 'return=minimal' },
        body: JSON.stringify({ credits }),
      });
    }
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
