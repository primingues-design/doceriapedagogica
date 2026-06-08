'use client'

import { useState } from 'react'
import Link from 'next/link'
import { pdf } from '@react-pdf/renderer'
import { downloadBlob } from '@/app/professor/utils/downloadBlob'
import { gerarCruzadinha } from '@/app/professor/generators/cruzadinha'
import { PdfCruzadinhaDoc } from '@/app/professor/components/pdf/PdfCruzadinhaDoc'
import { getTemplateConfig } from '@/app/professor/templates'
import type { NomeTemplate } from '@/app/professor/types/pdf.types'
import type { ResultadoCruzadinha, PalavraEntrada } from '@/app/professor/generators/cruzadinha'

const NIVEIS = [
  'Educação Infantil',
  '1º ao 3º ano',
  '4º ao 5º ano',
  '6º ao 9º ano',
  'Ensino Médio',
  'EJA — Alfabetização',
  'EJA — Fundamental',
]

function norm(str: string): string {
  return str.normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase().replace(/[^A-Z]/g, '')
}

function isElementaryLevel(nivel: string): boolean {
  return /infantil|[1-5]º|eja.{0,5}alfab/i.test(nivel)
}

function templatePorNivel(nivel: string): NomeTemplate {
  if (nivel.includes('Infantil') || nivel.includes('1º') || nivel.includes('2º') || nivel.includes('3º')) return 'infantilLudico'
  if (nivel.includes('4º') || nivel.includes('5º')) return 'fundamental1'
  if (nivel.includes('6º') || nivel.includes('9º') || nivel.includes('Médio')) return 'fundamental2'
  if (nivel.includes('EJA')) return 'ejaAdulto'
  return 'fundamental1'
}

function buildPrompt(tema: string, nivel: string): string {
  const isElem = isElementaryLevel(nivel)
  const emojiRule = isElem
    ? 'campo "emoji": adicione um emoji que represente visualmente a palavra (ex: ☀️ para sol). Escolha o mais intuitivo possível.'
    : 'campo "emoji": use string vazia ""'
  return `Crie uma cruzadinha sobre "${tema}" para o nível "${nivel}".

Retorne SOMENTE este JSON válido (sem markdown, sem texto extra):
{
  "titulo": "título criativo da cruzadinha",
  "palavras": [
    {"texto": "INVERNO", "dica": "Estação do ano com muito frio", "emoji": "❄️"},
    {"texto": "AMOR", "dica": "Sentimento de carinho entre pessoas", "emoji": "❤️"}
  ]
}

REGRAS OBRIGATÓRIAS:
- Gere 8 a 12 palavras relacionadas ao tema "${tema}"
- Palavras em MAIÚSCULAS, SEM acentos: Ã→A, Ç→C, É→E, Ó→O, Ú→U, Â→A, Ê→E, Ô→O, Í→I, Á→A
- Comprimento entre 4 e 10 letras
- Dicas claras e adequadas ao nível ${nivel}
- ${emojiRule}
- NUNCA coloque "USE CAIXA ALTA" nas dicas`
}

function extractJSON(raw: string): { titulo: string; palavras: { texto: string; dica: string; emoji?: string }[] } {
  const s = raw.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim()
  const a = s.indexOf('{'), b = s.lastIndexOf('}')
  if (a === -1 || b === -1) throw new Error('JSON não encontrado')
  return JSON.parse(s.slice(a, b + 1))
}

export default function CruzadinhaPage() {
  const [tema, setTema] = useState('')
  const [nivel, setNivel] = useState('4º ao 5º ano')
  const [gerando, setGerando] = useState(false)
  const [baixandoPdf, setBaixandoPdf] = useState(false)
  const [resultado, setResultado] = useState<ResultadoCruzadinha | null>(null)
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
          max_tokens: 1500,
          messages: [{ role: 'user', content: buildPrompt(tema, nivel) }],
        }),
      })
      const json = await res.json()
      const raw = json.content?.[0]?.text || ''
      const data = extractJSON(raw)

      const palavras: PalavraEntrada[] = (data.palavras || [])
        .map(p => ({ texto: norm(p.texto), dica: p.dica, emoji: p.emoji || '' }))
        .filter(p => p.texto.length >= 3)

      if (!palavras.length) throw new Error('Nenhuma palavra válida')

      const res2 = gerarCruzadinha(palavras)
      setResultado(res2)
      setTitulo(data.titulo || 'Cruzadinha')
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
      const data = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
      const nomeArquivo = titulo.replace(/[^a-zA-Z0-9\s]/g, '').trim().replace(/\s+/g, '_') || 'cruzadinha'

      const blob = await pdf(
        <PdfCruzadinhaDoc
          titulo={titulo}
          nivel={nivel}
          resultado={resultado}
          config={config}
          data={data}
          isElementary={isElementaryLevel(nivel)}
        />
      ).toBlob()

      downloadBlob(blob, `DoceriaPedagogica_Cruzadinha_${nomeArquivo}.pdf`)
    } catch (e) {
      console.error(e)
    } finally {
      setBaixandoPdf(false)
    }
  }

  const isElem = isElementaryLevel(nivel)

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

      <div className="max-w-[1240px] mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-7">

        {/* Formulário */}
        <div className="bg-white border border-black/10 rounded-2xl p-7 lg:sticky lg:top-6 self-start">
          <div className="text-lg font-bold mb-5" style={{ fontFamily: 'Playfair Display, serif' }}>
            🧩 Cruzadinha
          </div>

          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8a8785] mb-1.5">
            Tema / Conteúdo
          </label>
          <input
            className="w-full border-[1.5px] border-black/15 rounded-lg px-3 py-2.5 text-sm bg-[#faf7f2] mb-4 focus:outline-none focus:border-[#c8963e]"
            placeholder="Ex: Sistema Solar, Verbos, Rios do Brasil..."
            value={tema}
            onChange={e => setTema(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && gerar()}
          />

          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8a8785] mb-1.5">
            Nível de ensino
          </label>
          <select
            className="w-full border-[1.5px] border-black/15 rounded-lg px-3 py-2.5 text-sm bg-[#faf7f2] mb-5 focus:outline-none focus:border-[#c8963e]"
            value={nivel}
            onChange={e => setNivel(e.target.value)}
          >
            {NIVEIS.map(n => <option key={n}>{n}</option>)}
          </select>

          {erro && <p className="text-red-600 text-sm mb-3">{erro}</p>}

          <button
            onClick={gerar}
            disabled={gerando || !tema.trim()}
            className="w-full py-3 bg-[#c8963e] text-white rounded-xl font-bold text-[15px] hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          >
            {gerando ? '⏳ Gerando...' : '✨ Gerar Cruzadinha'}
          </button>
        </div>

        {/* Prévia */}
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
              <div className="text-5xl mb-3 opacity-30">🧩</div>
              <div className="text-[15px] font-semibold">Preencha o formulário e clique em Gerar</div>
              <div className="text-[13px] mt-1.5">O PDF inclui grade do aluno + gabarito do professor</div>
            </div>
          ) : (
            <div className="bg-white border border-black/10 rounded-2xl p-8">
              {/* Cabeçalho */}
              <div className="border-t-4 border-[#c8963e] pt-4 mb-6">
                <div className="text-[9px] font-bold uppercase tracking-widest text-[#8a8785] mb-1">
                  DoceriaPedagógica — Cruzadinha
                </div>
                <div className="text-2xl font-bold text-[#1a1917]" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {titulo}
                </div>
                <div className="text-[11px] text-[#8a8785] mt-1">
                  {nivel} • {resultado.placements.length} palavras
                </div>
              </div>

              {/* Grid + pistas */}
              <div className="flex gap-6 flex-wrap">
                {/* Grid */}
                <div className="flex-shrink-0 overflow-x-auto">
                  {resultado.gridData.map((linha, li) => (
                    <div key={li} className="flex">
                      {linha.map((celula, ci) => {
                        const num = resultado.placements.find(p => p.r === li && p.c === ci)?.numero
                        return celula === null ? (
                          <div key={ci} className="w-[22px] h-[22px] bg-[#d4cfc8]" />
                        ) : (
                          <div key={ci} className="w-[22px] h-[22px] border border-[#555] bg-white flex items-center justify-center relative">
                            {num && <span className="absolute top-[1px] left-[1.5px] text-[6px] font-bold text-[#888]">{num}</span>}
                          </div>
                        )
                      })}
                    </div>
                  ))}
                </div>

                {/* Pistas */}
                <div className="flex-1 min-w-[160px]">
                  {resultado.placements.filter(p => p.direcao === 'H').length > 0 && (
                    <div className="mb-3">
                      <div className="text-[9px] font-bold uppercase tracking-wider text-[#8a8785] border-b border-black/10 pb-1 mb-2">
                        Horizontais →
                      </div>
                      {resultado.placements.filter(p => p.direcao === 'H').sort((a, b) => a.numero - b.numero).map(p => (
                        <div key={p.numero} className="flex gap-1.5 items-start py-1 border-b border-black/5 text-[12px]">
                          <span className="font-bold text-[#c8963e] min-w-[20px]">{p.numero}.</span>
                          {isElem && p.emoji && <span>{p.emoji}</span>}
                          <span className="text-[#4a4845]">{p.dica}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {resultado.placements.filter(p => p.direcao === 'V').length > 0 && (
                    <div>
                      <div className="text-[9px] font-bold uppercase tracking-wider text-[#8a8785] border-b border-black/10 pb-1 mb-2">
                        Verticais ↓
                      </div>
                      {resultado.placements.filter(p => p.direcao === 'V').sort((a, b) => a.numero - b.numero).map(p => (
                        <div key={p.numero} className="flex gap-1.5 items-start py-1 border-b border-black/5 text-[12px]">
                          <span className="font-bold text-[#c8963e] min-w-[20px]">{p.numero}.</span>
                          {isElem && p.emoji && <span>{p.emoji}</span>}
                          <span className="text-[#4a4845]">{p.dica}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Campos aluno */}
              <div className="flex gap-6 pt-3 mt-4 border-t border-black/8 text-[12px] text-[#8a8785]">
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
