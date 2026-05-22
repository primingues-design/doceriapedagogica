import Link from 'next/link'

export default function Home() {
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
          <Link href="#" className="bg-[#C8742A] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#6B3A1F] transition">Começar grátis</Link>
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
          <Link href="#" className="bg-[#C8742A] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#6B3A1F] transition text-lg">
            🎯 Começar de graça
          </Link>
          <Link href="#ferramentas" className="border-2 border-[#3D1F0D]/20 text-[#3D1F0D] px-8 py-4 rounded-full font-medium hover:border-[#C8742A] hover:text-[#C8742A] transition text-lg">
            Ver ferramentas →
          </Link>
        </div>

        {/* STATS */}
        <div className="flex flex-col sm:flex-row justify-center gap-12 mt-12">
          <div>
            <div className="text-3xl font-bold text-[#C8742A]">+52</div>
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
              <h3 className="text-xl font-semibold text-[#3D1F0D] mt-4 mb-2">Atividades e jogos</h3>
              <p className="text-[#8A7060] text-sm">Crie exercícios personalizados e materiais lúdicos para engajar os alunos.</p>
            </div>
            <div className="rounded-3xl bg-white p-6 border border-[#C8742A]/10 shadow-sm">
              <div className="text-3xl">📝</div>
              <h3 className="text-xl font-semibold text-[#3D1F0D] mt-4 mb-2">Avaliações prontas</h3>
              <p className="text-[#8A7060] text-sm">Monte provas, listas de exercícios e rubricas alinhadas à BNCC.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PLANOS */}
      <section id="planos" className="py-20 px-8">
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
              <p>5 ferramentas disponíveis</p>
              <p>5 planos de aula por mês</p>
              <p>Atendimento por e-mail</p>
            </div>
            <Link href="#" className="mt-8 inline-flex w-full justify-center rounded-full bg-[#C8742A] px-6 py-3 text-sm font-semibold text-white hover:bg-[#6B3A1F] transition">
              Começar grátis
            </Link>
          </div>

          <div className="rounded-3xl bg-[#C8742A] text-white p-8 shadow-xl border border-[#C8742A]/20">
            <span className="text-sm font-semibold uppercase">Mais popular</span>
            <h3 className="text-3xl font-bold mt-4 mb-3">Profissional</h3>
            <p className="mb-6">Conteúdo ilimitado, geração rápida e integração com materiais de sala.</p>
            <div className="space-y-3 text-sm">
              <p>+40 ferramentas de IA</p>
              <p>Planos ilimitados</p>
              <p>Suporte prioritário</p>
            </div>
            <Link href="#" className="mt-8 inline-flex w-full justify-center rounded-full border border-white bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition">
              Assinar agora
            </Link>
          </div>

          <div className="rounded-3xl bg-white p-8 border border-[#C8742A]/10 shadow-sm">
            <span className="text-sm font-semibold uppercase text-[#C8742A]">Equipe</span>
            <h3 className="text-3xl font-bold text-[#3D1F0D] mt-4 mb-3">Institucional</h3>
            <p className="text-[#8A7060] mb-6">Para escolas e redes que precisam de gerenciamento de usuários e relatórios.</p>
            <div className="space-y-3 text-sm text-[#6B3A1F]">
              <p>Equipe ilimitada</p>
              <p>Ferramentas colaborativas</p>
              <p>Relatórios de uso</p>
            </div>
            <Link href="#" className="mt-8 inline-flex w-full justify-center rounded-full bg-[#C8742A] px-6 py-3 text-sm font-semibold text-white hover:bg-[#6B3A1F] transition">
              Solicitar demo
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
