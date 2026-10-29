'use client'

import Link from 'next/link'
import Script from 'next/script'
import { useEffect, useState } from 'react'

const SUPABASE_KEY = 'sb-atkwvwhwbkerezdmipxw-auth-token'
const COMECAR = '/prova.html' // gerador principal — funciona sem cadastro (3 grátis)

/* Centrais por matéria: 'pronta' = central com atividades prontas; 'nova' = em construção; 'ia' = gera com IA (matéria já escolhida) */
const CENTRAIS = [
  { i: '🔤', t: 'Alfabetização', c: '#E85A7D', bg: '#FFE3EC', s: 'Vogais, famílias silábicas, LH/NH/CH, caça-palavras + kits prontos', status: 'pronta', href: '/atividades-alfabetizacao.html' },
  { i: '➗', t: 'Matemática', c: '#2FB89A', bg: '#DDF7EE', s: 'Operações, frações, área, dinheiro, equações + apostila', status: 'pronta', href: '/matematica.html' },
  { i: '💬', t: 'Inglês', c: '#1F4E9A', bg: '#E3ECFA', s: 'Vocabulário por tema, flashcards e pronúncia', status: 'pronta', href: '/atividades-ingles.html' },
  { i: '💃', t: 'Espanhol', c: '#C8102E', bg: '#FDE3E6', s: 'Vocabulário por tema, tarjetas e pronúncia', status: 'pronta', href: '/atividades-espanhol.html' },
  { i: '📖', t: 'Língua Portuguesa', c: '#C8742A', bg: '#FFF0DE', s: 'Ortografia, gramática, pontuação e interpretação de texto', status: 'pronta', href: '/atividades-portugues.html' },
  { i: '🔬', t: 'Ciências', c: '#3B82C4', bg: '#E3F0FB', s: 'Animais, corpo humano, água, Sistema Solar e meio ambiente — com esquemas certos', status: 'pronta', href: '/atividades-ciencias.html' },
  { i: '🏛️', t: 'História', c: '#8A5A3B', bg: '#F4E8DD', s: 'Linha do tempo por período, personagens, fontes e leitura de imagem', status: 'pronta', href: '/atividades-historia.html' },
  { i: '🌎', t: 'Geografia', c: '#2E7D4F', bg: '#E2F3E7', s: 'Estados e capitais, mapa do Brasil, orientação, escala e leitura de mapas', status: 'pronta', href: '/atividades-geografia.html' },
  { i: '🎒', t: 'EJA', c: '#B5462A', bg: '#FBE7DF', s: 'Alfabetização de adultos, leituras por tema e atividades prontas', status: 'pronta', href: '/eja.html' },
  { i: '🎮', t: 'Jogos', c: '#7C5CE0', bg: '#EEE9FF', s: 'Quiz, memória, Confeitaria das Frações, Caixa da Feirinha', status: 'pronta', href: '/jogos-area.html' },
]

const IA_TIPOS = [
  ['✏️', 'Atividade com gabarito', '/prova.html'],
  ['📋', 'Avaliação (A a D)', '/prova.html'],
  ['🗓️', 'Plano de aula BNCC', '/plano.html'],
  ['🖥️', 'Slides para a aula', '/slides.html'],
  ['🧠', 'Mapa mental', '/mapa.html'],
  ['🎲', 'Jogo para a turma', '/jogos.html'],
]

const PORQUE = [
  ['🖨️', 'Imprime perfeito', 'Folhas no tamanho certo, sem desperdício, com gabarito em página separada.'],
  ['🗺️', 'Imagens que não erram', 'Mapas do IBGE, esquemas de ciências e obras reais — nada de imagem inventada.'],
  ['🎯', 'BNCC e gabarito', 'Toda questão com habilidade da BNCC e resposta comentada para o professor.'],
  ['📺', 'Jogos para a TV', 'Personagens, sons e modo apresentação para jogar com a turma toda.'],
]

const DEPOIMENTOS = [
  {
    texto: '"Eu estava nesse exato momento fazendo as provas de geografia e já fiz por lá! Dá certo! Amanhã vou parear o celular com a TV da minha sala e fazer um Quiz com a turma!"',
    nome: 'Professora Luciana',
    cargo: '5º Ano · Escola Pública',
    inicial: 'L',
  },
  {
    texto: '"Dá pra explorar demais! Sempre que termino um conteúdo gosto de dar um jogo online específico daquilo. No site consigo gerar do jeitinho que eu quiser — bem específico da matéria que acabei de dar. Espelho o celular no projetor e um aluno joga enquanto os outros assistem. Dá até pra alfabetização em inglês!"',
    nome: 'Professora Cristiane',
    cargo: 'Inglês · Escola Pública',
    inicial: 'C',
  },
]

const FAQ = [
  ['O que é a Doceria Pedagógica?', 'É uma plataforma de IA para professores: você gera atividades, avaliações, planos de aula, slides e jogos alinhados à BNCC em segundos — e ainda encontra centrais com materiais prontos de cada matéria.'],
  ['Preciso me cadastrar para usar?', 'Não. Você começa com 3 materiais grátis sem cadastro. Com o e-mail ganha mais 2 e, depois, 1 material grátis por semana.'],
  ['O que usa crédito?', 'Cada material que você baixa, imprime ou gera usa 1 crédito — tanto as atividades prontas das centrais quanto as criadas pela IA. Ver as prévias e navegar é livre.'],
  ['É assinatura?', 'Não. Se quiser mais, compra créditos avulsos que não expiram, a partir de R$ 9,90.'],
  ['A IA erra?', 'A IA pode errar, por isso todo material vem com gabarito e você revisa antes de imprimir. Imagens factuais (mapas, esquemas) vêm de fontes confiáveis, não de imagem inventada.'],
]

const FAQ_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
}

declare global {
  interface Window { charSVG?: (id: string, extra?: string) => string }
}

function montarTurma() {
  if (!window.charSVG) return
  document.querySelectorAll<HTMLElement>('[data-char]').forEach((el, i) => {
    if (el.dataset.ok) return
    el.dataset.ok = '1'
    el.innerHTML = window.charSVG!(el.dataset.char!)
    const c = el.firstElementChild as HTMLElement | null
    if (!c) return
    const acenar = () => { c.classList.remove('wave'); void c.getBoundingClientRect(); c.classList.add('wave') }
    setTimeout(acenar, 600 + i * 350)
    setInterval(acenar, 7000 + i * 900)
  })
}

export default function Home() {
  // Quem já tem conta continua vendo a página inicial (centrais sempre acessíveis);
  // só o botão do topo muda para "Minha conta".
  const [logada, setLogada] = useState(false)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(SUPABASE_KEY)
      if (raw) {
        const session = JSON.parse(raw)
        // visitante anônimo (3 grátis) não conta como conta criada
        if (session?.user && !session.user.is_anonymous) setLogada(true)
      }
    } catch {
      // sem sessão salva — mostra Entrar / Testar grátis
    }
    montarTurma()
  }, [])

  return (
    <main className="dp-home min-h-screen bg-[#FFFAF5] text-[#3D1F0D] overflow-x-hidden">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Nunito:wght@500;600;700;800;900&display=swap" precedence="default" />
      <link rel="stylesheet" href="/css/dp-turma.css" precedence="default" />
      <Script src="/js/dp-turma.js" strategy="afterInteractive" onLoad={montarTurma} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />
      <style>{`
        .dp-home{font-family:'Nunito',system-ui,sans-serif;-webkit-font-smoothing:antialiased}
        .dp-home .baloo{font-family:'Baloo 2','Nunito',sans-serif}
        .dp-home .blob{position:absolute;border-radius:50%;filter:blur(60px);opacity:.55;pointer-events:none}
        .dp-home .b3d{transition:transform .08s,box-shadow .08s}
        .dp-home .b3d:active{transform:translateY(4px)}
        .dp-home .card-central{transition:transform .18s,box-shadow .18s}
        .dp-home .card-central:hover{transform:translateY(-5px)}
        .dp-home .float{animation:dpflt 6s ease-in-out infinite}
        .dp-home .float.d2{animation-delay:-2s}
        .dp-home .float.d3{animation-delay:-4s}
        @keyframes dpflt{0%,100%{transform:translateY(0) rotate(var(--r,0deg))}50%{transform:translateY(-10px) rotate(var(--r,0deg))}}
        .dp-home .turma .char{width:100%;height:auto}
        .dp-home details summary::-webkit-details-marker{display:none}
        @media (prefers-reduced-motion:reduce){.dp-home .float{animation:none}}
      `}</style>

      {/* ── NAV ── */}
      <header className="fixed top-0 inset-x-0 z-50 bg-[#FFFAF5]/90 backdrop-blur border-b border-[#C8742A]/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 h-16 flex items-center gap-6">
          <a href="/" className="flex items-center gap-2 font-extrabold text-lg whitespace-nowrap">
            <img src="/img/robo-logo.png" alt="" width={44} height={44} className="w-11 h-11 object-contain -my-1" />
            Doceria <span className="text-[#C8742A]">Pedagógica</span>
          </a>
          <nav className="hidden md:flex gap-6 text-[15px] font-bold text-[#6B3A1F] ml-4">
            <a href="#centrais" className="hover:text-[#C8742A]">Centrais</a>
            <a href="#ia" className="hover:text-[#C8742A]">IA para professores</a>
            <a href="/jogos-area.html" className="hover:text-[#C8742A]">Jogos</a>
            <Link href="/pricing" className="hover:text-[#C8742A]">Preços</Link>
          </nav>
          <div className="ml-auto flex items-center gap-3">
            {logada ? (
              <a href="/conta.html" className="b3d bg-[#C8742A] text-white font-extrabold px-4 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base whitespace-nowrap rounded-full shadow-[0_4px_0_#9A5418]">Minha conta →</a>
            ) : (
              <>
                <Link href="/conta.html" className="hidden sm:block font-bold text-[#6B3A1F] hover:text-[#C8742A]">Entrar</Link>
                <a href={COMECAR} className="b3d bg-[#C8742A] text-white font-extrabold px-4 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base whitespace-nowrap rounded-full shadow-[0_4px_0_#9A5418]">Testar grátis</a>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-28 sm:pt-32 pb-16">
        <div className="blob w-[520px] h-[520px] bg-[#FFD9A8] -top-40 -left-40" />
        <div className="blob w-[420px] h-[420px] bg-[#FFC2D6] top-20 right-[-120px]" />
        <div className="blob w-[360px] h-[360px] bg-[#BFEFE2] bottom-[-140px] left-1/3" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-8 grid lg:grid-cols-[1.05fr_1fr] gap-10 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white border border-[#C8742A]/20 text-[#9A5418] px-4 py-1.5 rounded-full text-sm font-extrabold mb-6 shadow-sm">✨ A plataforma de IA para professores brasileiros</div>
            <h1 className="baloo text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-[4.3rem] font-extrabold tracking-tight mb-5">
              IA para professores: aulas <span className="text-[#C8742A]">incríveis</span> em minutos
            </h1>
            <p className="text-lg sm:text-xl text-[#7D5A44] max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed font-semibold">
              Atividades, avaliações, planos de aula e jogos <b className="text-[#3D1F0D]">alinhados à BNCC</b>, com gabarito e prontos para imprimir — ou use as <b className="text-[#3D1F0D]">centrais prontas</b> de cada matéria.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <a href={COMECAR} className="b3d bg-[#C8742A] text-white text-lg font-extrabold px-7 py-4 rounded-2xl shadow-[0_6px_0_#9A5418]">✨ Experimentar grátis — sem cadastro</a>
              <a href="#centrais" className="b3d bg-white text-[#3D1F0D] text-lg font-extrabold px-7 py-4 rounded-2xl shadow-[0_6px_0_#EAD6C3] border border-[#C8742A]/15">Ver as centrais ↓</a>
            </div>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 justify-center lg:justify-start text-sm font-bold text-[#8A7060]">
              <span>✔ Comece grátis, sem cadastro</span><span>✔ Gabarito em toda atividade</span><span>✔ Funciona no celular e na TV</span>
            </div>
          </div>
          <div className="relative h-[420px] sm:h-[480px]" aria-hidden="true">
            <img src="/atividades/previa/missao-matematica-4ano-mini.jpg" alt="" className="float absolute right-2 top-0 w-40 sm:w-48 rounded-xl shadow-2xl border-4 border-white" style={{ '--r': '5deg' } as React.CSSProperties} />
            <img src="/atividades/previa/mat-geometria-parte2-mini.jpg" alt="" className="float d2 absolute left-0 top-6 w-36 sm:w-44 rounded-xl shadow-2xl border-4 border-white" style={{ '--r': '-6deg' } as React.CSSProperties} />
            <div className="float d3 absolute left-1/2 -translate-x-1/2 top-24 bg-white rounded-2xl shadow-2xl px-4 py-3 text-center border border-[#C8742A]/10" style={{ '--r': '-2deg' } as React.CSSProperties}>
              <div className="text-xs font-extrabold text-[#2FB89A] uppercase tracking-wide">gerado em 20 s</div>
              <div className="baloo text-xl font-extrabold">Avaliação · 5º ano</div>
              <div className="text-sm font-bold text-[#8A7060]">10 questões + gabarito</div>
            </div>
            <div className="turma absolute inset-x-0 bottom-0 grid grid-cols-4 gap-1 items-end px-2">
              <div data-char="lia" /><div data-char="teo" /><div data-char="duda" /><div data-char="vo" />
            </div>
          </div>
        </div>
      </section>

      {/* ── CENTRAIS ── */}
      <section id="centrais" className="py-16 sm:py-20 px-4 sm:px-8 scroll-mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-[#C8742A] text-sm font-extrabold uppercase tracking-widest mb-2">Escolha sua central</div>
            <h2 className="baloo text-4xl sm:text-5xl font-extrabold tracking-tight">O básico de cada matéria, pronto para usar</h2>
            <p className="text-lg text-[#8A7060] font-semibold mt-3 max-w-2xl mx-auto">Atividades prontas e geradores com gabarito. Precisa de outro assunto? É só pedir para a IA da Doceria.</p>
          </div>

          {/* 🔁 SLOT SAZONAL: troque tema/links/cor a cada temporada */}
          <a href="/consciencia-negra.html" className="card-central block mb-3 rounded-3xl overflow-hidden shadow-xl bg-gradient-to-r from-[#8E3219] via-[#B5462A] to-[#E07A45] text-white">
            <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="text-5xl">✊🏿</div>
              <div className="flex-1">
                <div className="text-xs font-extrabold uppercase tracking-widest text-[#FBE6BF]">Especial do mês · 20 de novembro</div>
                <div className="baloo text-3xl font-extrabold leading-tight">Consciência Negra</div>
                <div className="font-semibold opacity-90">Texto de apoio, 9 atividades, mapa do IBGE por estado e avaliação de A a D.</div>
              </div>
              <span className="bg-white text-[#B5462A] font-extrabold px-5 py-3 rounded-full whitespace-nowrap">Ver atividades →</span>
            </div>
          </a>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {CENTRAIS.map((c) => (
              <a key={c.t} href={c.href} className="card-central bg-white rounded-3xl p-6 border border-black/5 flex flex-col" style={{ boxShadow: `0 8px 0 ${c.bg}` }}>
                <div className="w-14 h-14 rounded-2xl grid place-items-center text-3xl mb-4" style={{ background: c.bg }}>{c.i}</div>
                <h3 className="baloo text-2xl font-extrabold leading-tight">{c.t}</h3>
                <p className="text-sm text-[#8A7060] font-semibold mt-1 flex-1">{c.s}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs font-extrabold px-2.5 py-1 rounded-full" style={{ background: c.bg, color: c.c }}>
                    {c.status === 'pronta' ? '✔ Atividades prontas' : c.status === 'nova' ? '🆕 Central nova' : '✨ Gere com IA'}
                  </span>
                  <span className="font-extrabold" style={{ color: c.c }}>→</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── IA PARA PROFESSORES ── */}
      <section id="ia" className="py-16 sm:py-20 px-4 sm:px-8 bg-[#3D1F0D] text-white relative overflow-hidden scroll-mt-16">
        <div className="blob w-[420px] h-[420px] bg-[#C8742A] -right-40 -top-40" style={{ opacity: 0.3 }} />
        <div className="relative max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
            <div className="relative shrink-0 w-40 sm:w-48">
              <div className="absolute -top-3 left-1/2 sm:left-auto sm:-right-6 -translate-x-1/2 sm:translate-x-0 z-10 bg-white text-[#3D1F0D] font-extrabold text-sm px-3 py-1.5 rounded-2xl rounded-bl-sm shadow-lg whitespace-nowrap">Me diga o tema! 😊</div>
              <img src="/img/robo-doceria.webp" alt="Robozinho da IA da Doceria" width={359} height={440} className="float w-full h-auto drop-shadow-[0_18px_30px_rgba(0,0,0,.45)] mt-6" />
            </div>
            <div>
              <div className="text-[#FFD9A8] text-sm font-extrabold uppercase tracking-widest mb-2">Não achou o assunto?</div>
              <h2 className="baloo text-4xl sm:text-5xl font-extrabold leading-tight mb-4">A IA da Doceria faz para você</h2>
              <p className="text-lg text-white/80 font-semibold mb-6">Diga o tema, a turma e o objetivo. Em segundos você recebe o material pronto, com BNCC, gabarito e imagens certas — mapas e esquemas de verdade, não imagens inventadas.</p>
              <a href={COMECAR} className="b3d inline-block bg-[#FFC93C] text-[#3D1F0D] text-lg font-extrabold px-7 py-4 rounded-2xl shadow-[0_6px_0_#C99A16]">✨ Gerar com IA agora</a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {IA_TIPOS.map(([i, t, href]) => (
              <a key={t} href={href} className="bg-white/10 hover:bg-white/15 border border-white/15 rounded-2xl p-4 font-extrabold flex items-center gap-3 transition">
                <span className="text-2xl">{i}</span>{t}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── POR QUE ── */}
      <section className="py-16 sm:py-20 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="baloo text-4xl sm:text-5xl font-extrabold tracking-tight text-center mb-10">Feita por professora, para professores</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PORQUE.map(([i, t, d]) => (
              <div key={t} className="bg-white rounded-3xl p-6 border border-black/5 shadow-sm">
                <div className="text-4xl mb-3">{i}</div>
                <h3 className="baloo text-xl font-extrabold mb-1">{t}</h3>
                <p className="text-[#8A7060] font-semibold text-sm">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEPOIMENTOS (reais) ── */}
      <section className="pb-16 sm:pb-20 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="text-[#C8742A] text-sm font-extrabold uppercase tracking-widest mb-2">Quem já usa</div>
            <h2 className="baloo text-3xl sm:text-4xl font-extrabold tracking-tight">Professoras que ganharam tempo</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {DEPOIMENTOS.map(({ texto, nome, cargo, inicial }) => (
              <div key={nome} className="bg-white rounded-3xl p-6 border border-black/5 shadow-sm flex flex-col gap-4">
                <p className="text-[#6B3A1F] leading-relaxed italic font-semibold flex-1">{texto}</p>
                <div className="flex items-center gap-3 pt-4 border-t border-[#C8742A]/10">
                  <div className="w-10 h-10 rounded-full bg-[#FFE3C4] flex items-center justify-center text-[#C8742A] font-extrabold flex-shrink-0">{inicial}</div>
                  <div>
                    <p className="font-extrabold">{nome}</p>
                    <p className="text-sm text-[#8A7060] font-semibold">{cargo}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CRÉDITOS ── */}
      <section id="creditos" className="pb-16 sm:pb-20 px-4 sm:px-8 scroll-mt-16">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl border border-[#C8742A]/10 p-6 sm:p-10">
          <h2 className="baloo text-3xl sm:text-4xl font-extrabold text-center mb-2">Comece grátis</h2>
          <p className="text-center text-[#8A7060] font-semibold mb-8">Sem cadastro para começar. Cada material que você baixa ou gera — pronto da central ou criado pela IA — usa 1 crédito.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="rounded-2xl bg-[#FFF3E2] p-5"><div className="baloo text-4xl font-extrabold text-[#C8742A]">3</div><div className="font-bold">materiais grátis, sem cadastro</div></div>
            <div className="rounded-2xl bg-[#FFE3EC] p-5"><div className="baloo text-4xl font-extrabold text-[#C93468]">+2</div><div className="font-bold">com o seu e-mail</div></div>
            <div className="rounded-2xl bg-[#DDF7EE] p-5"><div className="baloo text-4xl font-extrabold text-[#1E8A72]">1</div><div className="font-bold">material grátis por semana</div></div>
            <div className="rounded-2xl bg-[#EEE9FF] p-5"><div className="baloo text-3xl font-extrabold text-[#6A4FD8]">R$ 9,90</div><div className="font-bold">10 créditos que não expiram</div></div>
          </div>
          <div className="text-center mt-6">
            <Link href="/pricing" className="font-extrabold text-[#C8742A] hover:underline">Ver todos os pacotes →</Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="pb-16 px-4 sm:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="baloo text-3xl sm:text-4xl font-extrabold text-center mb-6">Perguntas frequentes</h2>
          <div className="space-y-3">
            {FAQ.map(([q, a]) => (
              <details key={q} className="bg-white rounded-2xl border border-black/5 shadow-sm p-5">
                <summary className="cursor-pointer font-extrabold text-lg flex justify-between gap-4">{q}<span className="text-[#C8742A]">+</span></summary>
                <p className="mt-3 text-[#7D5A44] font-semibold">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="pb-20 px-4 sm:px-8 text-center">
        <h2 className="baloo text-3xl sm:text-4xl font-extrabold mb-5">Sua próxima aula pode ficar pronta agora</h2>
        <a href={COMECAR} className="b3d inline-block bg-[#C8742A] text-white text-lg font-extrabold px-8 py-4 rounded-2xl shadow-[0_6px_0_#9A5418]">✨ Experimentar grátis — sem cadastro</a>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-10 px-4 sm:px-8 border-t border-[#C8742A]/10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm font-semibold text-[#8A7060]">
          <div className="flex items-center gap-2 font-extrabold text-[#3D1F0D]">
            <img src="/img/robo-logo.png" alt="" width={32} height={32} className="w-8 h-8 object-contain" />
            Doceria Pedagógica
          </div>
          <div className="flex flex-col items-center gap-1 text-center">
            <p>© {new Date().getFullYear()} Doceria Pedagógica · A plataforma de IA para professores</p>
            <div className="flex flex-wrap justify-center gap-2 mt-1">
              <a href="mailto:doceriapedagogica@gmail.com" className="inline-flex items-center gap-1.5 bg-white border border-[#C8742A]/25 rounded-full px-3 py-1.5 text-[#6B3A1F] font-extrabold hover:border-[#C8742A]">✉ doceriapedagogica@gmail.com</a>
              <a href="https://www.instagram.com/doceria_pedagogica/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 bg-white border border-[#C8742A]/25 rounded-full px-3 py-1.5 text-[#6B3A1F] font-extrabold hover:border-[#C8742A]">📷 @doceria_pedagogica</a>
              <a href="https://wa.me/5511970739703?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Doceria%20Pedag%C3%B3gica." target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 bg-[#E7F8EE] border border-[#9AD9B4] rounded-full px-3 py-1.5 text-[#14683A] font-extrabold hover:border-[#14683A]">💬 WhatsApp (11) 97073-9703</a>
            </div>
          </div>
          <div className="flex items-center flex-wrap justify-center gap-4">
            <a href="/atividades-alfabetizacao.html" className="hover:text-[#C8742A]">Alfabetização</a>
            <a href="/matematica.html" className="hover:text-[#C8742A]">Matemática</a>
            <a href="/atividades-ingles.html" className="hover:text-[#C8742A]">Inglês</a>
            <a href="/atividades-espanhol.html" className="hover:text-[#C8742A]">Espanhol</a>
            <a href="/atividades-historia.html" className="hover:text-[#C8742A]">História</a>
            <a href="/atividades-geografia.html" className="hover:text-[#C8742A]">Geografia</a>
            <a href="/atividades-ciencias.html" className="hover:text-[#C8742A]">Ciências</a>
            <a href="/atividades-portugues.html" className="hover:text-[#C8742A]">Português</a>
            <a href="/atividades-ensino-religioso.html" className="hover:text-[#C8742A]">Ensino Religioso</a>
            <a href="/eja.html" className="hover:text-[#C8742A]">EJA</a>
            <a href="/alfabetizacao-eja.html" className="hover:text-[#C8742A]">Alfabetização EJA</a>
            <a href="/jogos-area.html" className="hover:text-[#C8742A]">Jogos</a>
            <a href="/consciencia-negra.html" className="hover:text-[#C8742A]">Consciência Negra</a>
            <Link href="/pricing" className="hover:text-[#C8742A]">Preços</Link>
            <Link href="/conta.html" className="text-[#C8742A] font-extrabold hover:underline whitespace-nowrap">Entrar →</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
