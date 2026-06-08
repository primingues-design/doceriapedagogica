'use client'

import { useState } from 'react'
import Link from 'next/link'
import { pdf } from '@react-pdf/renderer'
import { downloadBlob } from '@/app/professor/utils/downloadBlob'
import { gerarCacaPalavrasComGabarito } from '@/app/professor/generators/cacaPalavras'
import { PdfCacaPalavrasDoc } from '@/app/professor/components/pdf/PdfCacaPalavrasDoc'
import { getTemplateConfig } from '@/app/professor/templates'
import type { NomeTemplate, CelulaCacaPalavras } from '@/app/professor/types/pdf.types'
import type { ResultadoCacaPalavras } from '@/app/professor/generators/cacaPalavras'
import type { WordObj } from '@/app/professor/components/pdf/PdfCacaPalavrasDoc'

const NIVEIS = [
  'Educação Infantil',
  '1º ao 3º ano',
  '4º ao 5º ano',
  '6º ao 9º ano',
  'Ensino Médio',
  'EJA — Alfabetização',
  'EJA — Fundamental',
]

const TAMANHOS = [
  { val: 10, label: '10 × 10' },
  { val: 12, label: '12 × 12' },
  { val: 15, label: '15 × 15' },
]

const DIRECOES = [
  { val: 'easy',   label: '→ ↓ Fácil',      permitirDiag: false, tudo: false },
  { val: 'medium', label: '+ Diagonais',     permitirDiag: true,  tudo: false },
  { val: 'hard',   label: 'Todas — Difícil', permitirDiag: true,  tudo: true  },
]

function norm(str: string): string {
  return str.normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase().replace(/[^A-Z]/g, '')
}

function templatePorNivel(nivel: string): NomeTemplate {
  if (nivel.includes('Infantil') || nivel.includes('1º') || nivel.includes('2º') || nivel.includes('3º')) return 'infantilLudico'
  if (nivel.includes('4º') || nivel.includes('5º')) return 'fundamental1'
  if (nivel.includes('6º') || nivel.includes('9º') || nivel.includes('Médio')) return 'fundamental2'
  if (nivel.includes('EJA')) return 'ejaAdulto'
  return 'fundamental1'
}

function buildPrompt(tema: string, nivel: string): string {
  return `Crie um caça-palavras sobre "${tema}" para o nível "${nivel}".

Retorne SOMENTE este JSON válido (sem markdown, sem texto extra):
{
  "titulo": "título criativo do caça-palavras",
  "palavras": [
    {"texto": "PALAVRA", "dica": "definição breve adequada ao nível"},
    {"texto": "OUTRA", "dica": "definição"}
  ]
}

REGRAS OBRIGATÓRIAS:
- Gere 10 a 14 palavras relacionadas ao tema "${tema}"
- Palavras em MAIÚSCULAS, SEM acentos, SEM espaços: Ã→A, Ç→C, É→E, Ó→O, Ú→U, Â→A, Ê→E, Ô→O, Í→I, Á→A
- Comprimento entre 4 e 10 letras
- Dicas claras e adequadas ao nível ${nivel}
- NUNCA coloque "USE CAIXA ALTA" nas dicas`
}

function extractJSON(raw: string): { titulo: string; palavras: { texto: string; dica: string }[] } {
  const s = raw.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim()
  const a = s.indexOf('{'), b = s.lastIndexOf('}')
  if (a === -1 || b === -1) throw new Error('JSON não encontrado')
  return JSON.parse(s.slice(a, b + 1))
}

export default function CacaPalavrasPage() {
  const [tema, setTema] = useState('')
  const [nivel, setNivel] = useState('4º ao 5º ano')
  const [tamanho, setTamanho] = useState(12)
  const [direcao, setDirecao] = useState('easy')
  const [gerando, setGerando] = useState(false)
  const [baixandoPdf, setBaixandoPdf] = useState(false)
  const [resultado, setResultado] = useState<ResultadoCacaPalavras | null>(null)
  const [wordObjs, setWordObjs] = useState<WordObj[]>([])
  const [titulo, setTitulo] = useState('')
  const [erro, setErro] = useState('')

  async function gerar() {
    if (!tema.trim()) return
    setGerando(true)
    setErro('')
    setResultado(null)
    try {
      const res = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1024,
          messages: [{ role: 'user', content: buildPrompt(tema, nivel) }],
        }),
      })
      const json = await res.json()
      const raw = json.content?.[0]?.text || ''
      const data = extractJSON(raw)

      const dirConfig = DIRECOES.find(d => d.val === direcao)!
      const palavrasNormalizadas = (data.palavras || []).map(p => norm(p.texto))
      const res2 = gerarCacaPalavrasComGabarito({
        palavras: palavrasNormalizadas,
        tamanhoGrid: tamanho,
        permitirDiagonais: dirConfig.permitirDiag,
      })

      // Mantém apenas wordObjs cujas palavras foram colocadas no grid
      const colocadas = new Set(res2.bloco.palavras)
      const objs = (data.palavras || []).filter(p => colocadas.has(norm(p.texto)))

      setResultado(res2)
      setWordObjs(objs.map(p => ({ texto: norm(p.texto), dica: p.dica })))
      setTitulo(data.titulo || 'Caça-Palavras')
    } catch (e) {
      console.error(e)
      setErro('Erro ao gerar. Verifique sua conexão e tente novamente.')
    } finally {
      setGerando(false)
    }
  }

  async function baixarPdf() {
    if (!resultado) return
    setBaixandoPdf(true)
    try {
      const config = getTemplateConfig(templatePorNivel(nivel))
      const dirConfig = DIRECOES.find(d => d.val === direcao)!
      const dirLabel = { easy: '→ e ↓', medium: '→, ↓ e diagonais', hard: 'todas as direções' }[direcao] || ''
      const data = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
      const nomeArquivo = titulo.replace(/[^a-zA-Z0-9\s]/g, '').trim().replace(/\s+/g, '_') || 'caca-palavras'

      const blob = await pdf(
        <PdfCacaPalavrasDoc
          titulo={titulo}
          nivel={nivel}
          dirLabel={dirLabel}
          wordObjs={wordObjs}
          bloco={resultado.bloco}
          gabarito={resultado.gabarito}
          config={config}
          data={data}
        />
      ).toBlob()

      downloadBlob(blob, `DoceriaPedagogica_CacaPalavras_${nomeArquivo}.pdf`)
    } catch (e) {
      console.error(e)
    } finally {
      setBaixandoPdf(false)
    }
  }

  const dirLabel = { easy: '→ e ↓', medium: '→, ↓ e diagonais', hard: 'todas as direções' }[direcao] || ''

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

      {/* Layout */}
      <div className="max-w-[1240px] mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-7">

        {/* Painel de formulário */}
        <div className="bg-white border border-black/10 rounded-2xl p-7 lg:sticky lg:top-6 self-start">
          <div className="text-lg font-bold mb-5" style={{ fontFamily: 'Playfair Display, serif' }}>
            🔤 Caça-Palavras
          </div>

          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8a8785] mb-1.5">
            Tema / Conteúdo
          </label>
          <input
            className="w-full border-[1.5px] border-black/15 rounded-lg px-3 py-2.5 text-sm bg-[#faf7f2] mb-4 focus:outline-none focus:border-[#2d6e6e]"
            placeholder="Ex: Animais da floresta, Frações..."
            value={tema}
            onChange={e => setTema(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && gerar()}
          />

          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8a8785] mb-1.5">
            Nível de ensino
          </label>
          <select
            className="w-full border-[1.5px] border-black/15 rounded-lg px-3 py-2.5 text-sm bg-[#faf7f2] mb-4 focus:outline-none focus:border-[#2d6e6e]"
            value={nivel}
            onChange={e => setNivel(e.target.value)}
          >
            {NIVEIS.map(n => <option key={n}>{n}</option>)}
          </select>

          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8a8785] mb-2">
            Tamanho da grade
          </label>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {TAMANHOS.map(t => (
              <button
                key={t.val}
                onClick={() => setTamanho(t.val)}
                className={`px-3 py-1.5 rounded-full text-[12px] border-[1.5px] transition-all ${
                  tamanho === t.val
                    ? 'bg-[#2d6e6e] text-white border-[#2d6e6e] font-semibold'
                    : 'bg-white text-[#1a1917] border-black/15 hover:border-[#2d6e6e]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8a8785] mb-2">
            Direções das palavras
          </label>
          <div className="flex flex-wrap gap-1.5 mb-5">
            {DIRECOES.map(d => (
              <button
                key={d.val}
                onClick={() => setDirecao(d.val)}
                className={`px-3 py-1.5 rounded-full text-[12px] border-[1.5px] transition-all ${
                  direcao === d.val
                    ? 'bg-[#2d6e6e] text-white border-[#2d6e6e] font-semibold'
                    : 'bg-white text-[#1a1917] border-black/15 hover:border-[#2d6e6e]'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>

          {erro && <p className="text-red-600 text-sm mb-3">{erro}</p>}

          <button
            onClick={gerar}
            disabled={gerando || !tema.trim()}
            className="w-full py-3 bg-[#2d6e6e] text-white rounded-xl font-bold text-[15px] hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          >
            {gerando ? '⏳ Gerando...' : '✨ Gerar Caça-Palavras'}
          </button>
        </div>

        {/* Painel de prévia */}
        <div className="min-w-0">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8a8785]">
              Pré-visualização
            </span>
            {resultado && (
              <button
                onClick={baixarPdf}
                disabled={baixandoPdf}
                className="bg-[#c8963e] text-white px-5 py-2 rounded-lg text-[13px] font-bold hover:opacity-90 disabled:opacity-50 transition-opacity"
              >
                {baixandoPdf ? '⏳ Gerando PDF...' : '⬇ Baixar PDF'}
              </button>
            )}
          </div>

          {!resultado ? (
            <div className="bg-white border-[1.5px] border-dashed border-black/15 rounded-2xl p-20 text-center text-[#8a8785]">
              <div className="text-5xl mb-3 opacity-30">🔤</div>
              <div className="text-[15px] font-semibold">Preencha o formulário e clique em Gerar</div>
              <div className="text-[13px] mt-1.5">O PDF inclui folha do aluno + gabarito do professor</div>
            </div>
          ) : (
            <div className="bg-white border border-black/10 rounded-2xl p-8">
              {/* Cabeçalho */}
              <div className="border-t-4 border-[#2d6e6e] pt-4 mb-6">
                <div className="text-[9px] font-bold uppercase tracking-widest text-[#8a8785] mb-1">
                  DoceriaPedagógica — Caça-Palavras
                </div>
                <div className="text-2xl font-bold text-[#1a1917]" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {titulo}
                </div>
                <div className="text-[11px] text-[#8a8785] mt-1">
                  {nivel} • {wordObjs.length} palavras • Grade {tamanho}×{tamanho} • Direções: {dirLabel}
                </div>
              </div>

              {/* Grid */}
              <div className="mb-5 overflow-x-auto">
                <div
                  className="inline-grid gap-[2px]"
                  style={{ gridTemplateColumns: `repeat(${tamanho}, 1.625rem)` }}
                >
                  {resultado.bloco.grid.flat().map((celula, i) => (
                    <div
                      key={i}
                      className="w-[26px] h-[26px] flex items-center justify-center text-[13px] font-bold bg-white border border-black/15 rounded-[2px]"
                    >
                      {celula.letra}
                    </div>
                  ))}
                </div>
              </div>

              {/* Lista de palavras */}
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#8a8785] mb-2">
                Encontre as palavras:
              </div>
              <div className="grid grid-cols-2 gap-y-1.5 gap-x-4 mb-5">
                {wordObjs.map((w, i) => (
                  <div key={i} className="border-b border-black/8 pb-1.5">
                    <div className="text-[13px] font-bold text-[#1a1917]">{w.texto}</div>
                    {w.dica && <div className="text-[11px] text-[#8a8785]">{w.dica}</div>}
                  </div>
                ))}
              </div>

              {/* Campos aluno */}
              <div className="flex gap-6 pt-3 border-t border-black/8 text-[12px] text-[#8a8785]">
                <span>Nome: _______________________________</span>
                <span>Data: ________________</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
