'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function PricingPage() {
  const [anual, setAnual] = useState(false)

  return (
    <main className="min-h-screen bg-[#FFFAF5] overflow-x-hidden">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FDF6ED]/90 backdrop-blur border-b border-[#C8742A]/10 px-4 sm:px-8 h-16 flex items-center justify-between overflow-hidden">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl flex-shrink-0">
          <div className="w-8 h-8 bg-[#C8742A] rounded-lg flex items-center justify-center text-white text-sm flex-shrink-0">🍰</div>
          <span className="whitespace-nowrap">Doceria <span className="text-[#C8742A]">Pedagógica</span></span>
        </Link>
        <div className="flex items-center gap-3 sm:gap-6">
          <Link href="/#ferramentas" className="hidden sm:block text-sm text-[#6B3A1F] hover:text-[#C8742A]">Ferramentas</Link>
          <Link href="/conta.html" className="bg-[#C8742A] text-white px-4 sm:px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#6B3A1F] transition whitespace-nowrap">
            <span className="sm:hidden">Entrar</span>
            <span className="hidden sm:inline">Começar grátis</span>
          </Link>
        </div>
      </nav>

      {/* HEADER */}
      <section className="pt-32 pb-12 px-4 sm:px-8 text-center">
        <div className="text-[#C8742A] text-xs font-bold uppercase tracking-widest mb-3">Planos</div>
        <h1 className="text-4xl sm:text-5xl font-bold text-[#3D1F0D] mb-4">
          Simples e transparente
        </h1>
        <p className="text-[#8A7060] text-lg max-w-xl mx-auto mb-10">
          Escolha o plano ideal para sua rotina. Sem surpresas, sem taxas ocultas.
        </p>

        {/* Toggle Mensal / Anual */}
        <div className="inline-flex items-center bg-[#F0E6D8] rounded-full p-1 gap-1">
          <button
            onClick={() => setAnual(false)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
              !anual
                ? 'bg-white text-[#3D1F0D] shadow-sm'
                : 'text-[#8A7060] hover:text-[#3D1F0D]'
            }`}
          >
            Mensal
          </button>
          <button
            onClick={() => setAnual(true)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition flex items-center gap-2 ${
              anual
                ? 'bg-white text-[#3D1F0D] shadow-sm'
                : 'text-[#8A7060] hover:text-[#3D1F0D]'
            }`}
          >
            Anual
            <span className="bg-[#C8742A] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              -10%
            </span>
          </button>
        </div>
      </section>

      {/* CARDS */}
      <section className="pb-24 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-start">

          {/* PLANO FREE */}
          <div className="rounded-3xl bg-white p-8 border border-[#C8742A]/10 shadow-sm flex flex-col">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#C8742A]">Grátis</span>
              <h2 className="text-3xl font-bold text-[#3D1F0D] mt-3 mb-2">Starter</h2>
              <p className="text-[#8A7060] text-sm mb-6">Para conhecer a plataforma e experimentar as ferramentas.</p>

              <div className="mb-6">
                <span className="text-4xl font-bold text-[#3D1F0D]">R$0</span>
                <span className="text-[#8A7060] text-sm ml-1">para sempre</span>
              </div>

              <ul className="space-y-3 text-sm text-[#6B3A1F] mb-8">
                <li className="flex items-start gap-2">
                  <span className="text-[#C8742A] mt-0.5">✓</span>
                  10 gerações no 1º mês, depois 5/mês
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C8742A] mt-0.5">✓</span>
                  Todas as ferramentas disponíveis
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C8742A] mt-0.5">✓</span>
                  Download em PDF
                </li>
              </ul>
            </div>
            <Link
              href="/conta.html"
              className="mt-auto inline-flex w-full justify-center rounded-full border-2 border-[#C8742A] px-6 py-3 text-sm font-semibold text-[#C8742A] hover:bg-[#C8742A] hover:text-white transition"
            >
              Criar conta gratuita
            </Link>
          </div>

          {/* PLANO PRO */}
          <div className="rounded-3xl bg-[#C8742A] text-white p-8 shadow-xl flex flex-col relative">
            {anual && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#3D1F0D] text-white text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap">
                ⭐ Mais vantajoso
              </div>
            )}
            <div>
              <span className="text-xs font-bold uppercase tracking-widest opacity-80">Mais popular</span>
              <h2 className="text-3xl font-bold mt-3 mb-2">Pro</h2>
              <p className="opacity-90 text-sm mb-6">Para a professora ativa que cria materiais toda semana.</p>

              <div className="mb-1">
                {anual ? (
                  <>
                    <span className="text-4xl font-bold">R$17,90</span>
                    <span className="opacity-80 text-sm ml-1">/mês</span>
                    <div className="text-sm opacity-70 mt-1">
                      R$214,90 cobrado anualmente
                      <span className="ml-2 bg-white/20 px-2 py-0.5 rounded-full text-xs font-semibold">economize 10%</span>
                    </div>
                  </>
                ) : (
                  <>
                    <span className="text-4xl font-bold">R$19,90</span>
                    <span className="opacity-80 text-sm ml-1">/mês</span>
                    <div className="text-sm opacity-70 mt-1">
                      Valor promocional de lançamento
                    </div>
                  </>
                )}
              </div>

              <ul className="space-y-3 text-sm opacity-90 mt-6 mb-8">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5">✓</span>
                  40 gerações por mês
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5">✓</span>
                  Todas as ferramentas de IA
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5">✓</span>
                  Download ilimitado em PDF
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5">✓</span>
                  Suporte prioritário
                </li>
              </ul>
            </div>
            <Link
              href="/conta.html"
              className="mt-auto inline-flex w-full justify-center rounded-full border border-white bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white hover:text-[#C8742A] transition"
            >
              {anual ? 'Assinar plano anual' : 'Assinar plano mensal'}
            </Link>
          </div>

          {/* PLANO EQUIPE */}
          <div className="rounded-3xl bg-white p-8 border border-[#C8742A]/10 shadow-sm flex flex-col">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#C8742A]">Escola</span>
              <h2 className="text-3xl font-bold text-[#3D1F0D] mt-3 mb-2">Equipe</h2>
              <p className="text-[#8A7060] text-sm mb-6">10 professoras com conta própria, cada uma com sua cota individual.</p>

              <div className="mb-6">
                <span className="text-2xl font-bold text-[#3D1F0D]">Fale com a gente</span>
                <div className="text-sm text-[#8A7060] mt-1">Condições especiais para escolas</div>
              </div>

              <ul className="space-y-3 text-sm text-[#6B3A1F] mb-8">
                <li className="flex items-start gap-2">
                  <span className="text-[#C8742A] mt-0.5">✓</span>
                  10 contas independentes
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C8742A] mt-0.5">✓</span>
                  40 gerações por professora/mês
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C8742A] mt-0.5">✓</span>
                  Painel de gestão da escola
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C8742A] mt-0.5">✓</span>
                  Suporte dedicado
                </li>
              </ul>
            </div>
            <a
              href="mailto:contato@doceriapedagogica.com?subject=Quero%20o%20Plano%20Equipe"
              className="mt-auto inline-flex w-full justify-center rounded-full bg-[#C8742A] px-6 py-3 text-sm font-semibold text-white hover:bg-[#6B3A1F] transition"
            >
              Quero esse plano →
            </a>
          </div>

        </div>
      </section>

      {/* FAQ RÁPIDO */}
      <section className="py-16 px-4 sm:px-8 bg-[#FDF6ED]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-[#3D1F0D] mb-8 text-center">Perguntas frequentes</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-[#3D1F0D] mb-1">O que é uma "geração"?</h3>
              <p className="text-[#8A7060] text-sm">Cada vez que você clica em "Gerar" para criar um material (plano de aula, apostila, atividade etc.), conta como 1 geração.</p>
            </div>
            <div>
              <h3 className="font-semibold text-[#3D1F0D] mb-1">Os créditos acumulam entre meses?</h3>
              <p className="text-[#8A7060] text-sm">Não. Os créditos são renovados mensalmente a partir da data de assinatura. Créditos não usados não passam para o mês seguinte.</p>
            </div>
            <div>
              <h3 className="font-semibold text-[#3D1F0D] mb-1">Posso cancelar quando quiser?</h3>
              <p className="text-[#8A7060] text-sm">Sim. Você pode cancelar a qualquer momento pelo painel ou entrando em contato conosco. O acesso continua até o fim do período pago.</p>
            </div>
            <div>
              <h3 className="font-semibold text-[#3D1F0D] mb-1">O Plano Equipe é para mais de 10 professoras?</h3>
              <p className="text-[#8A7060] text-sm">Entre em contato! Temos condições especiais para equipes maiores. Escreva para <a href="mailto:contato@doceriapedagogica.com" className="text-[#C8742A] hover:underline">contato@doceriapedagogica.com</a>.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-4 sm:px-8 border-t border-[#C8742A]/10">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-[#3D1F0D]">
            <div className="w-7 h-7 bg-[#C8742A] rounded-lg flex items-center justify-center text-white text-xs flex-shrink-0">🍰</div>
            Doceria Pedagógica
          </Link>
          <div className="flex flex-col sm:flex-row items-center gap-3 text-sm text-[#8A7060] text-center">
            <p>© 2025 Doceria Pedagógica. Feito com carinho para professores brasileiros.</p>
            <a href="mailto:contato@doceriapedagogica.com" className="text-[#C8742A] hover:underline whitespace-nowrap">
              ✉ contato@doceriapedagogica.com
            </a>
          </div>
          <Link href="/conta.html" className="text-sm text-[#C8742A] font-semibold hover:underline whitespace-nowrap">Entrar na plataforma →</Link>
        </div>
      </footer>
    </main>
  )
}
