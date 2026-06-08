'use client'

import { useState } from 'react'
import Link from 'next/link'
import { pdf } from '@react-pdf/renderer'
import { downloadBlob } from '@/app/professor/utils/downloadBlob'
import { gerarProblemas, opLabel, type OpKey, type Dificuldade, type Problema } from './generators'
import { PdfMatematicaDoc } from '@/app/professor/components/pdf/PdfMatematicaDoc'

const OPERACOES: { val: OpKey | 'mista'; label: string }[] = [
  { val: 'adicao',        label: 'Adição +' },
  { val: 'subtracao',     label: 'Subtração -' },
  { val: 'multiplicacao', label: 'Multiplicação ×' },
  { val: 'divisao',       label: 'Divisão ÷' },
  { val: 'mista',         label: 'Mista' },
]

const DIFICULDADES: { val: Dificuldade; label: string; cor: string }[] = [
  { val: 'facil',   label: 'Fácil',   cor: '#2d7d4e' },
  { val: 'medio',   label: 'Médio',   cor: '#c8963e' },
  { val: 'dificil', label: 'Difícil', cor: '#d95f3b' },
]

const QUANTIDADES = [6, 9, 12, 16]

const NIVEIS = ['Educação Infantil', '1º ao 2º ano', '3º ao 5º ano', '6º ao 9º ano', 'Ensino Médio', 'EJA']

export default function MatematicaPage() {
  const [op, setOp] = useState<OpKey | 'mista'>('adicao')
  const [dif, setDif] = useState<Dificuldade>('facil')
  const [qty, setQty] = useState(9)
  const [nivel, setNivel] = useState('3º ao 5º ano')
  const [problemas, setProblemas] = useState<Problema[] | null>(null)
  const [baixandoPdf, setBaixandoPdf] = useState(false)

  function gerar() {
    setProblemas(gerarProblemas(op, dif, qty))
  }

  async function baixarPdf() {
    if (!problemas) return
    setBaixandoPdf(true)
    try {
      const data = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
      const label = opLabel(op)
      const difLbl = { facil: 'Fácil', medio: 'Médio', dificil: 'Difícil' }[dif]

      const blob = await pdf(
        <PdfMatematicaDoc
          problemas={problemas}
          opLabel={label}
          difLabel={difLbl}
          nivel={nivel}
          data={data}
        />
      ).toBlob()

      downloadBlob(blob, `DoceriaPedagogica_Matematica_${label.replace(/\s/g,'_')}_${difLbl}.pdf`)
    } catch (e) {
      console.error(e)
    } finally {
      setBaixandoPdf(false)
    }
  }

  const difLabel = { facil: 'Fácil', medio: 'Médio', dificil: 'Difícil' }[dif]
  const cols = qty <= 6 ? 2 : qty <= 9 ? 3 : 4

  return (
    <div className="min-h-screen bg-[#f5f0e8]" style={{ fontFamily: 'Outfit, sans-serif' }}>
      {/* Topbar */}
      <div className="bg-[#0f0e0c] px-8 h-14 flex items-center justify-between">
        <span className="font-bold text-[#c8963e] text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>
          DoceriaPedagógica
        </span>
        <Link href="/conta.html" className="text-white/60 text-sm hover:text-white transition-colors">
          ← Painel
        </Link>
      </div>

      <div className="max-w-[1240px] mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-7">

        {/* Formulário */}
        <div className="bg-white border border-black/10 rounded-2xl p-7 lg:sticky lg:top-6 self-start">
          <div className="text-lg font-bold mb-5" style={{ fontFamily: 'Playfair Display, serif' }}>
            ➗ Gerador de Matemática
          </div>

          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8a8785] mb-2">
            Operação
          </label>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {OPERACOES.map(o => (
              <button
                key={o.val}
                onClick={() => setOp(o.val)}
                className={`px-3 py-1.5 rounded-full text-[12px] border-[1.5px] transition-all font-medium ${
                  op === o.val
                    ? 'bg-[#2d6e6e] text-white border-[#2d6e6e] font-bold'
                    : 'bg-white text-[#8a8785] border-black/15 hover:border-[#2d6e6e]'
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>

          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8a8785] mb-2">
            Dificuldade
          </label>
          <div className="flex gap-1.5 mb-4">
            {DIFICULDADES.map(d => (
              <button
                key={d.val}
                onClick={() => setDif(d.val)}
                className={`px-3 py-1.5 rounded-full text-[12px] border-[1.5px] transition-all font-medium ${
                  dif === d.val
                    ? 'text-white border-transparent font-bold'
                    : 'bg-white text-[#8a8785] border-black/15'
                }`}
                style={dif === d.val ? { backgroundColor: d.cor, borderColor: d.cor } : {}}
              >
                {d.label}
              </button>
            ))}
          </div>

          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8a8785] mb-2">
            Quantidade de contas
          </label>
          <div className="flex gap-1.5 mb-4">
            {QUANTIDADES.map(q => (
              <button
                key={q}
                onClick={() => setQty(q)}
                className={`px-4 py-1.5 rounded-full text-[12px] border-[1.5px] transition-all font-medium ${
                  qty === q
                    ? 'bg-[#0f0e0c] text-white border-[#0f0e0c] font-bold'
                    : 'bg-white text-[#8a8785] border-black/15 hover:border-[#0f0e0c]'
                }`}
              >
                {q}
              </button>
            ))}
          </div>

          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8a8785] mb-1.5">
            Nível / Turma
          </label>
          <select
            className="w-full border-[1.5px] border-black/15 rounded-lg px-3 py-2.5 text-sm bg-[#faf7f2] mb-5 focus:outline-none focus:border-[#2d6e6e]"
            value={nivel}
            onChange={e => setNivel(e.target.value)}
          >
            {NIVEIS.map(n => <option key={n}>{n}</option>)}
          </select>

          <button
            onClick={gerar}
            className="w-full py-3 bg-[#2d6e6e] text-white rounded-xl font-bold text-[15px] hover:opacity-90 transition-opacity"
          >
            ✨ Gerar Folha
          </button>
        </div>

        {/* Prévia */}
        <div className="min-w-0">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8a8785]">
              Pré-visualização
            </span>
            {problemas && (
              <button
                onClick={baixarPdf}
                disabled={baixandoPdf}
                className="bg-[#c8963e] text-white px-5 py-2 rounded-lg text-[13px] font-bold hover:opacity-90 disabled:opacity-50 transition-opacity"
              >
                {baixandoPdf ? '⏳ Gerando PDF...' : '⬇ Baixar PDF'}
              </button>
            )}
          </div>

          {!problemas ? (
            <div className="bg-white border-[1.5px] border-dashed border-black/15 rounded-2xl p-20 text-center text-[#8a8785]">
              <div className="text-5xl mb-3 opacity-30">➗</div>
              <div className="text-[15px] font-semibold">Configure os filtros e clique em Gerar</div>
              <div className="text-[13px] mt-1.5">O PDF inclui folha do aluno + gabarito do professor</div>
            </div>
          ) : (
            <div className="bg-white border border-black/10 rounded-2xl p-8">
              {/* Cabeçalho */}
              <div className="border-t-4 border-[#2d6e6e] pt-4 mb-6">
                <div className="text-[9px] font-bold uppercase tracking-widest text-[#8a8785] mb-1">
                  DoceriaPedagógica — Folha de Matemática
                </div>
                <div className="text-2xl font-bold text-[#0f0e0c]" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {opLabel(op)} — Nível {difLabel}
                </div>
                <div className="text-[11px] text-[#8a8785] mt-1">{nivel} • {qty} questões</div>
                <div className="flex gap-6 mt-3 text-[12px] text-[#8a8785]">
                  <span>Nome: _________________________</span>
                  <span>Turma: __________</span>
                  <span>Data: __________</span>
                </div>
              </div>

              {/* Grid de contas */}
              <div
                className="grid gap-4"
                style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
              >
                {problemas.map((p, i) => (
                  <div
                    key={i}
                    className="bg-[#faf7f2] border border-black/10 rounded-lg px-4 py-3"
                  >
                    <div className="text-[10px] font-bold text-[#8a8785] mb-2">{i + 1}.</div>
                    <div className="flex flex-col items-end font-mono">
                      <div className="h-4" /> {/* carry space */}
                      <span className="text-[22px] font-bold tracking-widest">{p.num1}</span>
                      <div className="flex items-center gap-1">
                        <span className="text-[22px] font-bold text-[#2d6e6e] w-6 text-center">{p.sign}</span>
                        <span className="text-[22px] font-bold tracking-widest">{p.num2}</span>
                      </div>
                      <div className="w-full border-t-2 border-black my-1" />
                      {p.opKey === 'divisao' && (p.resto ?? 0) > 0 && (
                        <div className="text-[11px] text-[#8a8785] self-start">Resto: ____</div>
                      )}
                      <div className="h-8" /> {/* answer area */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
