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
    <main className="min-h-screen bg-[#FFFAF5] overflow-x-hidden">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FDF6ED]/90 backdrop-blur border-b border-[#C8742A]/10 px-4 sm:px-8 h-16 flex items-center justify-between overflow-hidden">
        <div className="flex items-center gap-2 font-bold text-xl flex-shrink-0">
          <div className="w-8 h-8 bg-[#C8742A] rounded-lg flex items-center justify-center text-white text-sm flex-shrink-0">🍰</div>
          <span className="whitespace-nowrap">Doceria <span className="text-[#C8742A]">Pedagógica</span></span>
        </div>
        <div className="flex items-center gap-3 sm:gap-6">
          <Link href="#ferramentas" className="hidden sm:block text-sm text-[#6B3A1F] hover:text-[#C8742A]">Ferramentas</Link>
          <Link href="/pricing" className="hidden sm:block text-sm text-[#6B3A1F] hover:text-[#C8742A]">Planos</Link>
          <Link href="/conta.html" className="bg-[#C8742A] text-white px-4 sm:px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#6B3A1F] transition whitespace-nowrap">
            <span className="sm:hidden">Entrar</span>
            <span className="hidden sm:inline">Começar grátis</span>
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-20 px-4 sm:px-8 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Texto */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-[#C8742A]/10 border border-[#C8742A]/20 text-[#C8742A] px-4 py-1.5 rounded-full text-xs font-bold mb-6">
              ✨ IA especialmente para professores brasileiros
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#3D1F0D] leading-tight mb-6">
              Prepare aulas <span className="text-[#C8742A] italic">incríveis</span><br />em minutos, não em horas
            </h1>
            <p className="text-lg text-[#8A7060] max-w-xl mb-10">
              A Doceria Pedagógica usa inteligência artificial para gerar planos de aula, atividades, jogos e avaliações — tudo pronto para usar ou imprimir.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/conta.html" className="bg-[#C8742A] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#6B3A1F] transition text-lg text-center">
                🎯 Começar de graça
              </Link>
              <Link href="#ferramentas" className="border-2 border-[#3D1F0D]/20 text-[#3D1F0D] px-8 py-4 rounded-full font-medium hover:border-[#C8742A] hover:text-[#C8742A] transition text-lg text-center">
                Ver ferramentas →
              </Link>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-12 mt-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#C8742A]">+12</div>
            <div className="text-sm text-[#8A7060]">ferramentas de IA</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#C8742A]">15h</div>
            <div className="text-sm text-[#8A7060]">economizadas por semana</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#C8742A]">100%</div>
            <div className="text-sm text-[#8A7060]">pronto para imprimir</div>
          </div>
        </div>
      </section>

      {/* FERRAMENTAS */}
      <section id="ferramentas" className="py-20 px-4 sm:px-8 bg-[#FDF6ED]">
        <div className="max-w-5xl mx-auto">
          <div className="text-[#C8742A] text-xs font-bold uppercase tracking-widest mb-3">Ferramentas de IA</div>
          <h2 className="text-4xl font-bold text-[#3D1F0D] mb-4">Tudo que você precisa, num só lugar</h2>
          <p className="text-[#8A7060] mb-10">Ferramentas criadas especialmente para professores brasileiros. Sem precisar saber de tecnologia.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
      <section className="py-20 px-4 sm:px-8">
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

      {/* CTA PLANOS */}
      <section className="py-20 px-4 sm:px-8 bg-[#FDF6ED]">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-[#C8742A] text-xs font-bold uppercase tracking-widest mb-3">Planos</div>
          <h2 className="text-4xl font-bold text-[#3D1F0D] mb-4">Comece hoje mesmo</h2>
          <p className="text-[#8A7060] mb-10 text-lg">
            Temos opções para professoras individuais e equipes escolares — do gratuito ao profissional.
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 bg-[#C8742A] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#6B3A1F] transition text-lg"
          >
            Confira nossos planos e comece hoje →
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-4 sm:px-8 border-t border-[#C8742A]/10">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-[#3D1F0D]">
            <div className="w-7 h-7 bg-[#C8742A] rounded-lg flex items-center justify-center text-white text-xs flex-shrink-0">🍰</div>
            Doceria Pedagógica
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 text-sm text-[#8A7060] text-center">
            <p>© 2025 Doceria Pedagógica. Feito com carinho para professores brasileiros.</p>
            <a href="mailto:doceriapedagogica@gmail.com" className="text-[#C8742A] hover:underline whitespace-nowrap">
              ✉ doceriapedagogica@gmail.com
            </a>
          </div>
          <Link href="/conta.html" className="text-sm text-[#C8742A] font-semibold hover:underline whitespace-nowrap">Entrar na plataforma →</Link>
        </div>
      </footer>
    </main>
  )
}
