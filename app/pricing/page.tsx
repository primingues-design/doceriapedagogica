'use client'

import { useState } from 'react'
import Link from 'next/link'

export const dynamic = 'force-static'

const PACKS = [
  { credits: 10, price: 'R$9,90', per: 'R$0,99', economia: null, best: false },
  { credits: 30, price: 'R$24,90', per: 'R$0,83', economia: '-16%', best: true },
  { credits: 60, price: 'R$44,90', per: 'R$0,75', economia: '-24%', best: false },
  { credits: 120, price: 'R$79,90', per: 'R$0,67', economia: '-32%', best: false },
]

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
      <section className="pt-32 pb-10 px-4 sm:px-8 text-center">
        <div className="text-[#C8742A] text-xs font-bold uppercase tracking-widest mb-3">Preços</div>
        <h1 className="text-4xl sm:text-5xl font-bold text-[#3D1F0D] mb-4">
          Pague só pelo que usar
        </h1>
        <p className="text-[#8A7060] text-lg max-w-xl mx-auto">
          Sem mensalidade obrigatória. Compre créditos avulsos que <strong className="text-[#6B3A1F]">nunca expiram</strong> — ou comece de graça agora mesmo.
        </p>

        {/* Selos de confiança */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-6 text-sm text-[#6B3A1F]">
          <span className="flex items-center gap-1.5"><span className="text-[#C8742A]">✓</span> Pagamento único</span>
          <span className="flex items-center gap-1.5"><span className="text-[#C8742A]">✓</span> Créditos não expiram</span>
          <span className="flex items-center gap-1.5"><span className="text-[#C8742A]">✓</span> PIX, cartão ou boleto</span>
        </div>
      </section>

      {/* HERO — CRÉDITOS AVULSOS */}
      <section className="pb-8 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {PACKS.map((p) => (
              <Link
                key={p.credits}
                href="/conta.html"
                className={`group relative rounded-3xl p-6 flex flex-col items-center text-center transition hover:-translate-y-1 ${
                  p.best
                    ? 'bg-[#C8742A] text-white shadow-xl ring-2 ring-[#C8742A]'
                    : 'bg-white text-[#3D1F0D] border border-[#C8742A]/15 shadow-sm hover:shadow-md'
                }`}
              >
                {p.best && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#3D1F0D] text-white text-[11px] font-bold px-3 py-1 rounded-full whitespace-nowrap">
                    ⭐ Melhor valor
                  </div>
                )}
                <div className="text-5xl font-bold leading-none mt-2">{p.credits}</div>
                <div className={`text-xs uppercase tracking-widest mt-1 mb-4 ${p.best ? 'opacity-80' : 'text-[#8A7060]'}`}>créditos</div>
                <div className="text-2xl font-bold">{p.price}</div>
                <div className={`text-xs mt-1 ${p.best ? 'opacity-80' : 'text-[#8A7060]'}`}>
                  {p.per} por crédito
                  {p.economia && (
                    <span className={`ml-1.5 font-semibold ${p.best ? 'text-white' : 'text-[#C8742A]'}`}>{p.economia}</span>
                  )}
                </div>
                <div
                  className={`mt-5 w-full rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                    p.best
                      ? 'bg-white text-[#C8742A] group-hover:bg-[#FDF6ED]'
                      : 'border-2 border-[#C8742A] text-[#C8742A] group-hover:bg-[#C8742A] group-hover:text-white'
                  }`}
                >
                  Comprar
                </div>
              </Link>
            ))}
          </div>

          <p className="text-center text-sm text-[#8A7060] mt-6">
            1 crédito = 1 material gerado (plano de aula, apostila, atividade, prova, jogo…). Compra única — os créditos ficam na sua conta até você usar.
          </p>
        </div>
      </section>

      {/* FAIXA GRÁTIS */}
      <section className="py-8 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto rounded-3xl bg-[#FDF6ED] border border-[#C8742A]/10 px-6 sm:px-10 py-7 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#C8742A] mb-1">Grátis para começar</div>
            <h2 className="text-2xl font-bold text-[#3D1F0D] mb-1">Experimente sem pagar nada</h2>
            <p className="text-[#8A7060] text-sm">
              <strong className="text-[#6B3A1F]">10 gerações grátis</strong> no primeiro mês, depois 5 por mês. Todas as ferramentas liberadas, sem cartão.
            </p>
          </div>
          <Link
            href="/conta.html"
            className="flex-shrink-0 inline-flex justify-center rounded-full bg-[#C8742A] px-7 py-3 text-sm font-semibold text-white hover:bg-[#6B3A1F] transition whitespace-nowrap"
          >
            Criar conta gratuita
          </Link>
        </div>
      </section>

      {/* PLANOS MENSAIS (secundário) */}
      <section className="py-14 px-4 sm:px-8 bg-[#FDF6ED]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="text-xs font-bold uppercase tracking-widest text-[#C8742A] mb-2">Prefere no automático?</div>
            <h2 className="text-3xl font-bold text-[#3D1F0D] mb-3">Planos mensais</h2>
            <p className="text-[#8A7060] max-w-lg mx-auto mb-6">
              Para quem cria materiais toda semana e quer créditos renovando sozinhos. Cancele quando quiser.
            </p>

            {/* Toggle Mensal / Anual */}
            <div className="inline-flex items-center bg-white rounded-full p-1 gap-1 border border-[#C8742A]/10">
              <button
                onClick={() => setAnual(false)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                  !anual ? 'bg-[#C8742A] text-white shadow-sm' : 'text-[#8A7060] hover:text-[#3D1F0D]'
                }`}
              >
                Mensal
              </button>
              <button
                onClick={() => setAnual(true)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition flex items-center gap-2 ${
                  anual ? 'bg-[#C8742A] text-white shadow-sm' : 'text-[#8A7060] hover:text-[#3D1F0D]'
                }`}
              >
                Anual
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${anual ? 'bg-white/20 text-white' : 'bg-[#C8742A] text-white'}`}>
                  -10%
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-start">
            {/* PRO */}
            <div className="rounded-3xl bg-white p-7 border border-[#C8742A]/15 shadow-sm flex flex-col">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#C8742A]">Pro</span>
                  <span className="bg-[#C8742A]/10 text-[#C8742A] text-[10px] font-bold px-2 py-0.5 rounded-full">Mais popular</span>
                </div>
                <p className="text-[#8A7060] text-sm mb-5">Para a professora ativa que cria materiais toda semana.</p>

                <div className="mb-5">
                  {anual ? (
                    <>
                      <span className="text-3xl font-bold text-[#3D1F0D]">R$17,90</span>
                      <span className="text-[#8A7060] text-sm ml-1">/mês</span>
                      <div className="text-xs text-[#8A7060] mt-1">
                        R$214,90 cobrado anualmente
                        <span className="ml-2 bg-[#C8742A]/10 text-[#C8742A] px-2 py-0.5 rounded-full font-semibold">economize 10%</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="text-3xl font-bold text-[#3D1F0D]">R$19,90</span>
                      <span className="text-[#8A7060] text-sm ml-1">/mês</span>
                      <div className="text-xs text-[#8A7060] mt-1">Valor promocional de lançamento</div>
                    </>
                  )}
                </div>

                <ul className="space-y-2.5 text-sm text-[#6B3A1F] mb-6">
                  <li className="flex items-start gap-2"><span className="text-[#C8742A] mt-0.5">✓</span>40 gerações por mês</li>
                  <li className="flex items-start gap-2"><span className="text-[#C8742A] mt-0.5">✓</span>Todas as ferramentas de IA</li>
                  <li className="flex items-start gap-2"><span className="text-[#C8742A] mt-0.5">✓</span>Download ilimitado em PDF</li>
                  <li className="flex items-start gap-2"><span className="text-[#C8742A] mt-0.5">✓</span>Suporte prioritário</li>
                </ul>
              </div>
              <Link
                href="/conta.html"
                className="mt-auto inline-flex w-full justify-center rounded-full bg-[#C8742A] px-6 py-3 text-sm font-semibold text-white hover:bg-[#6B3A1F] transition"
              >
                {anual ? 'Assinar plano anual' : 'Assinar plano mensal'}
              </Link>
            </div>

            {/* EQUIPE */}
            <div className="rounded-3xl bg-white p-7 border border-[#C8742A]/15 shadow-sm flex flex-col">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#C8742A]">Escola</span>
                <p className="text-[#8A7060] text-sm mt-2 mb-5">10 professoras com conta própria, cada uma com sua cota individual.</p>

                <div className="mb-5">
                  <span className="text-2xl font-bold text-[#3D1F0D]">R$179,90</span>
                  <span className="text-[#8A7060] text-sm ml-1">/mês</span>
                  <div className="text-xs text-[#8A7060] mt-1">400 gerações/mês no total • 40 por professora</div>
                </div>

                <ul className="space-y-2.5 text-sm text-[#6B3A1F] mb-6">
                  <li className="flex items-start gap-2"><span className="text-[#C8742A] mt-0.5">✓</span>10 contas independentes</li>
                  <li className="flex items-start gap-2"><span className="text-[#C8742A] mt-0.5">✓</span>40 gerações por professora/mês</li>
                  <li className="flex items-start gap-2"><span className="text-[#C8742A] mt-0.5">✓</span>Painel de gestão da escola</li>
                  <li className="flex items-start gap-2"><span className="text-[#C8742A] mt-0.5">✓</span>Suporte dedicado</li>
                </ul>
              </div>
              <a
                href="mailto:contato@doceriapedagogica.com?subject=Quero%20o%20Plano%20Equipe"
                className="mt-auto inline-flex w-full justify-center rounded-full border-2 border-[#C8742A] px-6 py-3 text-sm font-semibold text-[#C8742A] hover:bg-[#C8742A] hover:text-white transition"
              >
                Falar com a equipe →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ RÁPIDO */}
      <section className="py-16 px-4 sm:px-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-[#3D1F0D] mb-8 text-center">Perguntas frequentes</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-[#3D1F0D] mb-1">Preciso assinar alguma coisa?</h3>
              <p className="text-[#8A7060] text-sm">Não. Você pode usar as 10 gerações grátis e, quando quiser mais, comprar um pacote de créditos avulsos. É pagamento único, sem mensalidade.</p>
            </div>
            <div>
              <h3 className="font-semibold text-[#3D1F0D] mb-1">Os créditos avulsos expiram?</h3>
              <p className="text-[#8A7060] text-sm">Nunca. Os créditos comprados em pacote ficam na sua conta até você usar, sem prazo de validade.</p>
            </div>
            <div>
              <h3 className="font-semibold text-[#3D1F0D] mb-1">O que é uma "geração"?</h3>
              <p className="text-[#8A7060] text-sm">Cada vez que você clica em "Gerar" para criar um material (plano de aula, apostila, atividade etc.), conta como 1 geração — ou seja, 1 crédito.</p>
            </div>
            <div>
              <h3 className="font-semibold text-[#3D1F0D] mb-1">E os planos mensais, valem a pena?</h3>
              <p className="text-[#8A7060] text-sm">Se você cria materiais toda semana, o plano Pro sai mais barato por geração e renova sozinho. Para uso ocasional, os pacotes avulsos costumam ser a melhor escolha.</p>
            </div>
            <div>
              <h3 className="font-semibold text-[#3D1F0D] mb-1">Como pago?</h3>
              <p className="text-[#8A7060] text-sm">Pagamento 100% seguro via Mercado Pago: PIX com confirmação instantânea, cartão de crédito ou boleto.</p>
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
            <p>© {new Date().getFullYear()} Doceria Pedagógica. Feito com carinho para professores brasileiros.</p>
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
