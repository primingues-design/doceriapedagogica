'use client'

import Link from 'next/link'
import { useEffect } from 'react'

const SUPABASE_KEY = 'sb-atkwvwhwbkerezdmipxw-auth-token'

export default function Home() {
  useEffect(() => {
    try {
      const raw = localStorage.getItem(SUPABASE_KEY)
      if (raw) {
        const session = JSON.parse(raw)
        const expiresAt = session?.expires_at ?? 0
        if (expiresAt > Date.now() / 1000) {
          window.location.href = '/conta.html'
        }
      }
    } catch {
      // sem sessão válida — exibe a landing page normalmente
    }
  }, [])

  return (
    <main className="min-h-screen bg-[#FFFAF5]">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FDF6ED]/90 backdrop-blur border-b border-[#C8742A]/10 px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-xl">
          <div className="w-8 h-8 bg-[#C8742A] rounded-lg flex items-center justify-center text-white text-sm">🍰</div>
          <span>Doceria <span className="text-[#C8742A]">Pedagógica</span></span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="#ferramentas" className="text-sm text-[#6B3A1F] hover:text-[#C8742A]">Ferramentas</Link>
          <Link href="#planos" className="text-sm text-[#6B3A1F] hover:text-[#C8742A]">Planos</Link>
          <Link href="/conta.html" className="bg-[#C8742A] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#6B3A1F] transition">Começar grátis</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-20 px-8 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-[#C8742A]/10 border border-[#C8742A]/20 text-[#C8742A] px-4 py-1.5 rounded-full text-xs font-bold mb-6">
          ✨ IA especialmente para professores brasileiros
        </div>
        <h1 className="text-5xl font-bold text-[#3D1F0D] leading-tight mb-6">
          Prepare aulas <span className="text-[#C8742A] italic">incríveis</span><br />em minutos, não em horas
        </h1>
        <p className="text-lg text-[#8A7060] max-w-2xl mx-auto mb-10">
          A Doceria Pedagógica usa inteligência artificial para gerar planos de aula, atividades, jogos e avaliações — tudo pronto para usar ou imprimir.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/conta.html" className="bg-[#C8742A] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#6B3A1F] transition text-lg">
            🎯 Começar de graça
          </Link>
          <Link href="#ferramentas" className="border-2 border-[#3D1F0D]/20 text-[#3D1F0D] px-8 py-4 rounded-full font-medium hover:border-[#C8742A] hover:text-[#C8742A] transition text-lg">
            Ver ferramentas →
          </Link>
        </div>

        {/* STATS */}
        <div className="flex flex-col sm:flex-row justify-center gap-12 mt-12">
          <div>
            <div className="text-3xl font-bold text-[#C8742A]">+12</div>
            <div className="text-sm text-[#8A7060]">ferramentas de IA</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#C8742A]">15h</div>
            <div className="text-sm text-[#8A7060]">economizadas por semana</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#C8742A]">100%</div>
            <div className="text-sm text-[#8A7060]">pronto para imprimir</div>
          </div>
        </div>
      </section>

      {/* FERRAMENTAS */}
      <section id="ferramentas" className="py-20 px-8 bg-[#FDF6ED]">
        <div className="max-w-5xl mx-auto">
          <div className="text-[#C8742A] text-xs font-bold uppercase tracking-widest mb-3">Ferramentas de IA</div>
          <h2 className="text-4xl font-bold text-[#3D1F0D] mb-4">Tudo que você precisa, num só lugar</h2>
          <p className="text-[#8A7060] mb-10">Ferramentas criadas especialmente para professores brasileiros. Sem precisar saber de tecnologia.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-3xl bg-white p-6 border border-[#C8742A]/10 shadow-sm">
              <div className="text-3xl">🧠</div>
              <h3 className="text-xl font-semibold text-[#3D1F0D] mt-4 mb-2">Plano de Aula Inteligente</h3>
              <p className="text-[#8A7060] text-sm">Gere planos completos em segundos para qualquer série e disciplina.</p>
            </div>
            <div className="rounded-3xl bg-white p-6 border border-[#C8742A]/10 shadow-sm">
              <div className="text-3xl">🎲</div>
              <h3 className="text-xl font-semibold text-[#3D1F0D] mt-4 mb-2">Atividades e Jogos</h3>
              <p className="text-[#8A7060] text-sm">Crie exercícios personalizados e materiais lúdicos para engajar os alunos.</p>
            </div>
            <div className="rounded-3xl bg-white p-6 border border-[#C8742A]/10 shadow-sm">
              <div className="text-3xl">🎠</div>
              <h3 className="text-xl font-semibold text-[#3D1F0D] mt-4 mb-2">Apresentações e Slides</h3>
              <p className="text-[#8A7060] text-sm">Monte apresentações visuais prontas para usar em sala de aula.</p>
            </div>
            <div className="rounded-3xl bg-white p-6 border border-[#C8742A]/10 shadow-sm">
              <div className="text-3xl">📄</div>
              <h3 className="text-xl font-semibold text-[#3D1F0D] mt-4 mb-2">Apostilas e Atividades</h3>
              <p className="text-[#8A7060] text-sm">Gere apostilas completas e atividades impressas com gabarito.</p>
            </div>
            <div className="rounded-3xl bg-white p-6 border border-[#C8742A]/10 shadow-sm">
              <div className="text-3xl">🗺️</div>
              <h3 className="text-xl font-semibold text-[#3D1F0D] mt-4 mb-2">Mapas Mentais</h3>
              <p className="text-[#8A7060] text-sm">Visualize conteúdos com mapas mentais organizados e coloridos.</p>
            </div>
            <div className="rounded-3xl bg-white p-6 border border-[#C8742A]/10 shadow-sm">
              <div className="text-3xl">🔤</div>
              <h3 className="text-xl font-semibold text-[#3D1F0D] mt-4 mb-2">Alfabetização</h3>
              <p className="text-[#8A7060] text-sm">Materiais específicos para alfabetização e letramento inicial.</p>
            </div>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="py-20 px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="text-[#C8742A] text-xs font-bold uppercase tracking-widest mb-3">Como funciona</div>
          <h2 className="text-4xl font-bold text-[#3D1F0D] mb-14">3 passos e o material está pronto</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-[#C8742A] text-white flex items-center justify-center text-xl font-bold mb-4">1</div>
              <h3 className="text-lg font-semibold text-[#3D1F0D] mb-2">Escolha a ferramenta</h3>
              <p className="text-[#8A7060] text-sm">Selecione o tipo de material que você precisa criar.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-[#C8742A] text-white flex items-center justify-center text-xl font-bold mb-4">2</div>
              <h3 className="text-lg font-semibold text-[#3D1F0D] mb-2">Informe o tema e série</h3>
              <p className="text-[#8A7060] text-sm">Preencha o assunto, ano escolar e outras preferências.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-[#C8742A] text-white flex items-center justify-center text-xl font-bold mb-4">3</div>
              <h3 className="text-lg font-semibold text-[#3D1F0D] mb-2">Baixe ou imprima</h3>
              <p className="text-[#8A7060] text-sm">O material gerado está pronto para usar ou salvar em PDF.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PLANOS */}
      <section id="planos" className="py-20 px-8 bg-[#FDF6ED]">
        <div className="max-w-5xl mx-auto text-center mb-14">
          <div className="text-[#C8742A] text-xs font-bold uppercase tracking-widest mb-3">Planos</div>
          <h2 className="text-4xl font-bold text-[#3D1F0D] mb-4">Escolha o plano certo para sua rotina</h2>
          <p className="text-[#8A7060] max-w-3xl mx-auto">A Doceria Pedagógica oferece opções para professores individuais ou equipes escolares. Sem complicação, com entrega imediata.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="rounded-3xl bg-white p-8 border border-[#C8742A]/10 shadow-sm">
            <span className="text-sm font-semibold uppercase text-[#C8742A]">Grátis</span>
            <h3 className="text-3xl font-bold text-[#3D1F0D] mt-4 mb-3">Starter</h3>
            <p className="text-[#8A7060] mb-6">Acesso a recursos básicos e modelos para começar a criar.</p>
            <div className="space-y-3 text-sm text-[#6B3A1F]">
              <p>✓ 5 créditos de geração por mês</p>
              <p>✓ Todas as ferramentas disponíveis</p>
              <p>✓ Download em PDF</p>
            </div>
            <Link href="/conta.html" className="mt-8 inline-flex w-full justify-center rounded-full bg-[#C8742A] px-6 py-3 text-sm font-semibold text-white hover:bg-[#6B3A1F] transition">
              Começar grátis
            </Link>
          </div>

          <div className="rounded-3xl bg-[#C8742A] text-white p-8 shadow-xl border border-[#C8742A]/20">
            <span className="text-sm font-semibold uppercase">Mais popular</span>
            <h3 className="text-3xl font-bold mt-4 mb-3">Profissional</h3>
            <p className="mb-6 opacity-90">Geração ilimitada e acesso completo a todas as ferramentas.</p>
            <div className="space-y-3 text-sm opacity-90">
              <p>✓ Créditos ilimitados</p>
              <p>✓ Todas as ferramentas de IA</p>
              <p>✓ Suporte prioritário</p>
            </div>
            <Link href="/conta.html" className="mt-8 inline-flex w-full justify-center rounded-full border border-white bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition">
              Assinar agora
            </Link>
          </div>

          <div className="rounded-3xl bg-white p-8 border border-[#C8742A]/10 shadow-sm">
            <span className="text-sm font-semibold uppercase text-[#C8742A]">Equipe</span>
            <h3 className="text-3xl font-bold text-[#3D1F0D] mt-4 mb-3">Institucional</h3>
            <p className="text-[#8A7060] mb-6">Para escolas e redes que precisam de gerenciamento e relatórios.</p>
            <div className="space-y-3 text-sm text-[#6B3A1F]">
              <p>✓ Equipe ilimitada</p>
              <p>✓ Ferramentas colaborativas</p>
              <p>✓ Relatórios de uso</p>
            </div>
            <Link href="/conta.html" className="mt-8 inline-flex w-full justify-center rounded-full bg-[#C8742A] px-6 py-3 text-sm font-semibold text-white hover:bg-[#6B3A1F] transition">
              Solicitar demo
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-8 border-t border-[#C8742A]/10">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-[#3D1F0D]">
            <div className="w-7 h-7 bg-[#C8742A] rounded-lg flex items-center justify-center text-white text-xs">🍰</div>
            Doceria Pedagógica
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 text-sm text-[#8A7060]">
            <p>© 2025 Doceria Pedagógica. Feito com carinho para professores brasileiros.</p>
            <a href="mailto:doceriapedagogica@gmail.com" className="text-[#C8742A] hover:underline whitespace-nowrap">
              ✉ doceriapedagogica@gmail.com
            </a>
          </div>
          <Link href="/conta.html" className="text-sm text-[#C8742A] font-semibold hover:underline">Entrar na plataforma →</Link>
        </div>
      </footer>
    </main>
  )
}
