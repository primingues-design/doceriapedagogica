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

      {/* ── NAV ── */}
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

      {/* ── HERO ── */}
      <section className="pt-32 pb-16 px-4 sm:px-8 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-10">

          {/* Texto */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-[#C8742A]/10 border border-[#C8742A]/20 text-[#C8742A] px-4 py-1.5 rounded-full text-xs font-bold mb-6">
              ✨ IA especialmente para professores brasileiros
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#3D1F0D] leading-tight mb-6">
              Prepare aulas <span className="text-[#C8742A] italic">incríveis</span><br />em minutos, não em horas
            </h1>
            <p className="text-lg text-[#8A7060] max-w-xl mb-4">
              Gere atividades, planos de aula, jogos e materiais pedagógicos{' '}
              <strong className="text-[#3D1F0D]">alinhados à BNCC</strong> — prontos para imprimir ou usar em sala.
            </p>
            <p className="text-sm text-[#8A7060]/80 mb-10">
              Sem editar template. Sem perder horas no Canva. Só informar o tema e baixar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/conta.html" className="bg-[#C8742A] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#6B3A1F] transition text-lg text-center">
                🎯 Começar de graça
              </Link>
              <Link href="#como-funciona" className="border-2 border-[#3D1F0D]/20 text-[#3D1F0D] px-8 py-4 rounded-full font-medium hover:border-[#C8742A] hover:text-[#C8742A] transition text-lg text-center">
                Como funciona →
              </Link>
            </div>
          </div>

          {/* Mockup de atividade gerada — lado direito */}
          <div className="flex-1 w-full max-w-sm md:max-w-none">
            <div className="bg-white rounded-2xl shadow-xl border border-[#C8742A]/10 p-6 text-left relative">
              {/* Badge "gerado agora" */}
              <div className="absolute -top-3 right-4 bg-[#C8742A] text-white text-[10px] font-bold px-3 py-1 rounded-full">
                ✦ Gerado em 18 segundos
              </div>
              {/* Cabeçalho do material */}
              <div className="border-b border-gray-100 pb-3 mb-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[10px] text-[#8A7060] uppercase tracking-widest">Atividade · 3º Ano · Português</p>
                    <h3 className="text-base font-bold text-[#3D1F0D] mt-0.5">O Ciclo da Água</h3>
                  </div>
                  <span className="text-[10px] bg-[#C8742A]/10 text-[#C8742A] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">BNCC EF03CI04</span>
                </div>
              </div>
              {/* Texto introdutório */}
              <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                A água percorre um ciclo natural chamado <strong>Ciclo da Água</strong>, passando pelos estados líquido, gasoso e sólido. Esse processo é essencial para a vida na Terra...
              </p>
              {/* Atividade 1 */}
              <div className="bg-[#FFFAF5] rounded-xl p-3 mb-3 border border-[#C8742A]/10">
                <p className="text-xs font-semibold text-[#3D1F0D] mb-2">1. Responda com suas palavras:</p>
                <p className="text-xs text-gray-500 mb-1">O que acontece com a água quando ela esquenta?</p>
                <div className="h-5 border-b border-dashed border-gray-200 mt-2"></div>
                <div className="h-5 border-b border-dashed border-gray-200 mt-2"></div>
              </div>
              {/* Atividade 2 */}
              <div className="bg-[#FFFAF5] rounded-xl p-3 border border-[#C8742A]/10">
                <p className="text-xs font-semibold text-[#3D1F0D] mb-2">2. Verdadeiro ou Falso:</p>
                <div className="space-y-1.5 text-xs text-gray-600">
                  {[
                    'A água pode estar no estado gasoso.',
                    'O ciclo ocorre apenas nos oceanos.',
                  ].map((frase, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="flex gap-1 flex-shrink-0">
                        <span className="border border-gray-300 rounded px-1.5 text-[10px]">V</span>
                        <span className="border border-gray-300 rounded px-1.5 text-[10px]">F</span>
                      </div>
                      <span>{frase}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Rodapé do PDF */}
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                <p className="text-[9px] text-gray-300">Doceria Pedagógica · doceriapedagogica.com</p>
                <p className="text-[9px] text-gray-300">BNCC EF03CI04</p>
              </div>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-16 mt-14 pt-10 border-t border-[#C8742A]/10">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#C8742A]">+12</div>
            <div className="text-sm text-[#8A7060]">ferramentas pedagógicas</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#C8742A]">30 seg</div>
            <div className="text-sm text-[#8A7060]">para gerar um material completo</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#C8742A]">100%</div>
            <div className="text-sm text-[#8A7060]">pronto para imprimir ou projetar</div>
          </div>
        </div>
      </section>

      {/* ── FERRAMENTAS ── */}
      <section id="ferramentas" className="py-20 px-4 sm:px-8 bg-[#FDF6ED]">
        <div className="max-w-5xl mx-auto">
          <div className="text-[#C8742A] text-xs font-bold uppercase tracking-widest mb-3">Ferramentas de IA</div>
          <h2 className="text-4xl font-bold text-[#3D1F0D] mb-4">Tudo que você precisa, num só lugar</h2>
          <p className="text-[#8A7060] mb-10">
            Criadas para a realidade das professoras brasileiras. Alinhadas à BNCC. Sem precisar saber de tecnologia.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {[
              {
                icon: '📋',
                title: 'Plano de Aula',
                desc: 'Completo com objetivos, desenvolvimento e avaliação — com código BNCC.',
                badge: 'BNCC',
              },
              {
                icon: '📝',
                title: 'Atividade com Gabarito',
                desc: 'Texto, interpretação, V ou F, múltipla escolha e questões abertas. Pronta para imprimir.',
              },
              {
                icon: '🔤',
                title: 'Alfabetização',
                desc: 'Ligue/associe, complete a palavra e formação de sílabas para Ed. Infantil e Fund. I.',
                badge: 'Infantil',
              },
              {
                icon: '🎮',
                title: 'Jogos Interativos',
                desc: 'Quiz, memória, trilha e caça-palavras que seus alunos jogam na TV ou celular.',
                badge: 'Gratuito',
              },
              {
                icon: '📺',
                title: 'Aula na Lousa',
                desc: 'Roteiro do que escrever e falar no quadro — introdução, desenvolvimento e fechamento.',
              },
              {
                icon: '🗓️',
                title: 'Aula do Dia',
                desc: 'A IA sugere um tema pedagógico baseado no dia de hoje — aula sempre relevante.',
                badge: 'Novidade',
              },
              {
                icon: '🎨',
                title: 'Apresentação de Slides',
                desc: '6 temas visuais, fullscreen, exportação em PDF para projetar em sala.',
              },
              {
                icon: '➗',
                title: 'Gerador de Matemática',
                desc: 'Contas, operações e problemas com gabarito para imprimir — por nível de dificuldade.',
              },
              {
                icon: '🧩',
                title: 'Cruzadinha & Caça-palavras',
                desc: 'Interativo online e em PDF. Qualquer tema em segundos.',
                badge: 'Gratuito',
              },
            ].map(({ icon, title, desc, badge }) => (
              <div key={title} className="rounded-2xl bg-white p-6 border border-[#C8742A]/10 shadow-sm relative">
                {badge && (
                  <span className="absolute top-4 right-4 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#C8742A]/10 text-[#C8742A]">
                    {badge}
                  </span>
                )}
                <div className="text-2xl mb-3">{icon}</div>
                <h3 className="text-base font-semibold text-[#3D1F0D] mb-1">{title}</h3>
                <p className="text-[#8A7060] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMO FUNCIONA ── */}
      <section id="como-funciona" className="py-20 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="text-[#C8742A] text-xs font-bold uppercase tracking-widest mb-3">Como funciona</div>
          <h2 className="text-4xl font-bold text-[#3D1F0D] mb-4">3 passos e o material está pronto</h2>
          <p className="text-[#8A7060] mb-14 max-w-xl mx-auto">
            Sem editar template, sem dominar design. Você informa o tema — a Doceria entrega.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                n: '1',
                title: 'Escolha a ferramenta',
                desc: 'Plano de aula, atividade, jogo, slides… selecione o que a turma precisa hoje.',
              },
              {
                n: '2',
                title: 'Informe tema, série e objetivo',
                desc: 'Digite o assunto e selecione o nível. Você pode incluir a habilidade da BNCC.',
              },
              {
                n: '3',
                title: 'Baixe ou imprima',
                desc: 'O material aparece em segundos — PDF pronto, com gabarito quando necessário.',
              },
            ].map(({ n, title, desc }) => (
              <div key={n} className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-[#C8742A] text-white flex items-center justify-center text-xl font-bold mb-4">{n}</div>
                <h3 className="text-lg font-semibold text-[#3D1F0D] mb-2">{title}</h3>
                <p className="text-[#8A7060] text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEPOIMENTOS ──
          ⚠️  Substitua o conteúdo abaixo por depoimentos reais das professoras.
              Basta pedir autorização e trocar nome, cargo e texto.
      */}
      <section className="py-20 px-4 sm:px-8 bg-[#FDF6ED]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-[#C8742A] text-xs font-bold uppercase tracking-widest mb-3">Quem já usa</div>
            <h2 className="text-3xl font-bold text-[#3D1F0D]">Professoras que ganharam tempo — e alunos que aprenderam mais</h2>
          </div>
          {/* ⚠️ Adicione mais cards aqui quando tiver novos depoimentos reais */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
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
            ].map(({ texto, nome, cargo, inicial }) => (
              <div key={nome} className="bg-white rounded-2xl p-6 border border-[#C8742A]/10 shadow-sm flex flex-col gap-4">
                <p className="text-[#6B3A1F] text-sm leading-relaxed italic flex-1">{texto}</p>
                <div className="flex items-center gap-3 pt-4 border-t border-[#C8742A]/10">
                  <div className="w-9 h-9 rounded-full bg-[#C8742A]/20 flex items-center justify-center text-[#C8742A] font-bold text-sm flex-shrink-0">
                    {inicial}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#3D1F0D]">{nome}</p>
                    <p className="text-xs text-[#8A7060]">{cargo}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA PLANOS ── */}
      <section className="py-20 px-4 sm:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-[#C8742A] text-xs font-bold uppercase tracking-widest mb-3">Planos</div>
          <h2 className="text-4xl font-bold text-[#3D1F0D] mb-4">Comece hoje mesmo</h2>
          <p className="text-[#8A7060] mb-4 text-lg">
            Grátis para começar. R$19,90/mês para quem usa todo dia.
          </p>
          <p className="text-sm text-[#8A7060]/70 mb-10">
            Sem cartão de crédito para criar sua conta. Cancele quando quiser.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/conta.html"
              className="inline-flex items-center justify-center gap-2 bg-[#C8742A] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#6B3A1F] transition text-lg"
            >
              🎯 Criar conta grátis
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 border-2 border-[#3D1F0D]/20 text-[#3D1F0D] px-8 py-4 rounded-full font-medium hover:border-[#C8742A] hover:text-[#C8742A] transition text-lg"
            >
              Ver todos os planos →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-10 px-4 sm:px-8 border-t border-[#C8742A]/10">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-[#3D1F0D]">
            <div className="w-7 h-7 bg-[#C8742A] rounded-lg flex items-center justify-center text-white text-xs flex-shrink-0">🍰</div>
            Doceria Pedagógica
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 text-sm text-[#8A7060] text-center">
            <p>© {new Date().getFullYear()} Doceria Pedagógica. Feito com carinho para professores brasileiros.</p>
            <a href="mailto:doceriapedagogica@gmail.com" className="text-[#C8742A] hover:underline whitespace-nowrap">
              ✉ doceriapedagogica@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/pricing" className="text-sm text-[#8A7060] hover:text-[#C8742A]">Planos</Link>
            <Link href="/conta.html" className="text-sm text-[#C8742A] font-semibold hover:underline whitespace-nowrap">Entrar na plataforma →</Link>
          </div>
        </div>
      </footer>

    </main>
  )
}
