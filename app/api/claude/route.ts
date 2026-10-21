import { NextRequest, NextResponse } from 'next/server';
import { tokenFrom, verifyUser } from '@/lib/verifyUser';
import { cobrar } from '@/lib/creditos';
import { criarTokenImagem } from '@/lib/imgToken';

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

export async function POST(request: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return NextResponse.json({ error: 'ANTHROPIC_API_KEY não configurada' }, { status: 500 });

  const token = tokenFrom(request.headers.get('authorization'));
  if (!token) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });

  // Token conferido no Supabase (assinatura + validade) — id/e-mail vêm do servidor, não do token.
  const user = await verifyUser(token);
  if (!user) return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
  const body = await request.json();
  // Custo em créditos por geração (padrão 1). Páginas mais pesadas (ex.: apostila
  // sazonal da Copa) mandam creditCost:2. Trava server-side entre 1 e 3 para o
  // cliente não conseguir burlar pedindo custo 0 ou negativo.
  const creditCost = Math.min(Math.max(parseInt(body?.creditCost, 10) || 1, 1), 3);

  const cob = await cobrar(user, creditCost);
  if (!cob.ok) return NextResponse.json(cob.body, { status: cob.status });

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
      await cob.devolver();
      return NextResponse.json({ error: 'A IA não conseguiu gerar este material. Tente reformular o pedido.' }, { status: 422 });
    }

    // As páginas leem data.content[0].text: devolve só o TEXTO final (sem blocos de raciocínio),
    // no mesmo formato de antes — nenhuma página precisa mudar.
    if (response.ok && Array.isArray(data?.content)) {
      const texto = data.content.filter((b: { type?: string }) => b.type === 'text').map((b: { text?: string }) => b.text || '').join('');
      data.content = [{ type: 'text', text: texto }];
    }

    if (!response.ok) {
      await cob.devolver();
      return NextResponse.json(data, { status: response.status });
    }

    // Autorização para as imagens desta geração (a página manda de volta em /api/imagem).
    const imgToken = criarTokenImagem(user.id);
    return NextResponse.json(data, {
      status: 200,
      headers: {
        'X-Credits-Remaining': cob.restante === null ? 'ilimitado' : String(cob.restante),
        ...(imgToken ? { 'X-Img-Token': imgToken } : {}),
      },
    });
  } catch (e) {
    await cob.devolver();
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
