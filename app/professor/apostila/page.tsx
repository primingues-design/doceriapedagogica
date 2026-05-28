'use client'

import { useState } from 'react'
import Link from 'next/link'
import { pdf } from '@react-pdf/renderer'
import { PdfApostilaDoc } from '@/app/professor/components/pdf/PdfApostilaDoc'
import { getTemplateConfig } from '@/app/professor/templates'
import type { NomeTemplate } from '@/app/professor/types/pdf.types'
import type { ApostilaData } from './types'

const NIVEIS: { val: string; label: string }[] = [
  { val: 'Educação Infantil (4-5 anos)', label: 'Educação Infantil' },
  { val: 'Fundamental I — Anos Iniciais (1º ao 5º ano)', label: 'Fundamental I (1º–5º)' },
  { val: 'Fundamental II — Anos Finais (6º ao 9º ano)', label: 'Fundamental II (6º–9º)' },
  { val: 'EJA — Alfabetização de Adultos', label: 'EJA — Alfabetização' },
  { val: 'EJA — Ensino Fundamental para adultos', label: 'EJA — Fundamental' },
  { val: 'EJA — Ensino Médio para adultos', label: 'EJA — Médio' },
  { val: 'Ensino Médio Regular', label: 'Ensino Médio' },
  { val: 'Inglês — Nível Básico A1/A2', label: 'Inglês Básico A1/A2' },
  { val: 'Inglês — Intermediário B1/B2', label: 'Inglês Interm. B1/B2' },
  { val: 'Espanhol — Básico', label: 'Espanhol Básico' },
]

const TIPOS_ATIVIDADE = [
  { val: 'Interpretação de texto', label: '📖 Interpretação', ativo: true },
  { val: 'Questões abertas', label: '✍️ Abertas', ativo: true },
  { val: 'Múltipla escolha', label: '☑️ Múltipla escolha', ativo: true },
  { val: 'Complete as frases', label: '✏️ Complete', ativo: true },
  { val: 'Produção escrita', label: '📝 Produção escrita', ativo: true },
  { val: 'Verdadeiro ou Falso', label: '✅ V ou F', ativo: false },
  { val: 'Associação de colunas', label: '🔗 Associação', ativo: false },
]

const EXTRAS = [
  { id: 'mapa_mental', label: '🧠 Mapa mental', sub: 'Organização visual do conteúdo', ativo: true },
  { id: 'destaque', label: '💡 Caixa de destaque', sub: 'Conceito ou dado importante', ativo: true },
  { id: 'plano_de_aula', label: '📋 Plano de aula junto', sub: 'Orientações e BNCC', ativo: false },
  { id: 'musica_pedagogica', label: '🎵 Música pedagógica', sub: 'Rap, cordel ou paródia', ativo: false },
]

const PASSOS = [
  'Estruturando conteúdo pedagógico...',
  'Criando texto introdutório...',
  'Gerando atividades variadas...',
  'Montando mapa mental...',
  'Diagramando layout profissional...',
  'Finalizando apostila...',
]

function templatePorNivel(nivel: string): NomeTemplate {
  if (nivel.includes('Infantil')) return 'infantilLudico'
  if (nivel.includes('1º') || nivel.includes('2º') || nivel.includes('3º') || nivel.includes('4º') || nivel.includes('5º')) return 'fundamental1'
  if (nivel.includes('6º') || nivel.includes('9º') || nivel.includes('Médio Regular')) return 'fundamental2'
  if (nivel.includes('EJA')) return 'ejaAdulto'
  return 'fundamental1'
}

function extractJSON(raw: string): ApostilaData {
  const s = raw.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim()
  const a = s.indexOf('{'), b = s.lastIndexOf('}')
  if (a === -1 || b === -1) throw new Error('JSON não encontrado')
  return JSON.parse(s.slice(a, b + 1))
}

function buildPrompt(tema: string, nivel: string, disciplina: string, objetivo: string, obs: string, tipos: string[], extras: string[]): string {
  const temCruzadinha = tipos.includes('Cruzadinha com palavras do tema')
  const temVF = tipos.includes('Verdadeiro ou Falso')
  const temInterpretacao = tipos.includes('Interpretação de texto')

  return `Crie uma apostila pedagógica completa e bem estruturada.

TEMA: ${tema}
NÍVEL: ${nivel}
${disciplina ? 'DISCIPLINA: ' + disciplina : ''}
${objetivo ? 'OBJETIVO: ' + objetivo : ''}
${obs ? 'OBSERVAÇÕES: ' + obs : ''}
TIPOS DE ATIVIDADE SOLICITADOS: ${tipos.join(', ') || 'Interpretação de texto, Questões abertas, Produção escrita'}
SEÇÕES EXTRAS: ${extras.join(', ') || 'nenhuma'}

REGRAS OBRIGATÓRIAS:
1. Gere entre 5 e 7 atividades no total.
${temInterpretacao ? '2. Inclua ao menos 3 questões de interpretação de texto.\n' : ''}
3. Múltipla escolha: campo "opcoes" deve ser ARRAY com 4 itens: ["A) texto", "B) texto", "C) texto", "D) texto"].
4. Verdadeiro ou Falso: "tipo_resposta" = "vf" e "itens_vf" = array de frases (mínimo 4).
5. Complete as frases: use ___ para espaços em branco.
6. NUNCA inclua "USE CAIXA ALTA" nos enunciados.
7. Questões abertas: tipo_resposta "linhas" com pelo menos 3 linhas.
8. Produção escrita: tipo_resposta "caixa".

Retorne SOMENTE JSON válido, sem markdown, sem texto extra:
{
  "titulo": "título impactante e criativo",
  "subtitulo": "subtítulo complementar",
  "nivel": "${nivel}",
  "disciplina": "${disciplina || tema}",
  "introducao_titulo": "título da introdução",
  "introducao_texto": "texto introdutório (4-5 parágrafos separados por \\n)",
  "destaque": ${extras.includes('destaque') ? '{"titulo":"Sabia que...","texto":"fato marcante sobre o tema"}' : 'null'},
  "mapa_mental": ${extras.includes('mapa_mental') ? '{"centro":"palavra central","ramos":["ramo1","ramo2","ramo3","ramo4","ramo5","ramo6"]}' : 'null'},
  "atividades": [
    {
      "numero": 1,
      "tipo": "Interpretação de Texto",
      "enunciado": "Leia o trecho:\\n\\n[trecho aqui]\\n\\na) Pergunta 1?\\nb) Pergunta 2?",
      "tipo_resposta": "linhas",
      "linhas": 4,
      "opcoes": null,
      "itens_vf": null
    }
  ],
  "fechamento_titulo": "título do fechamento",
  "fechamento_texto": "texto reflexivo (2-3 parágrafos separados por \\n)",
  "musica": ${extras.includes('musica_pedagogica') ? '{"tipo":"rap/cordel/paródia","letra":"letra pedagógica completa (2 estrofes + refrão)"}' : 'null'},
  "orientacao_professor": "dica de aplicação em sala (2-3 linhas)${extras.includes('plano_de_aula') ? ' com objetivo, etapas, recursos, avaliação e habilidades BNCC' : ''}",
  "palavras_chave": ["palavra1","palavra2","palavra3","palavra4"]
}`
}

export default function ApostilaPage() {
  const [tema, setTema] = useState('')
  const [nivel, setNivel] = useState('')
  const [disciplina, setDisciplina] = useState('')
  const [objetivo, setObjetivo] = useState('')
  const [obs, setObs] = useState('')
  const [tipos, setTipos] = useState<Record<string, boolean>>(
    Object.fromEntries(TIPOS_ATIVIDADE.map(t => [t.val, t.ativo]))
  )
  const [extras, setExtras] = useState<Record<string, boolean>>(
    Object.fromEntries(EXTRAS.map(e => [e.id, e.ativo]))
  )
  const [gerando, setGerando] = useState(false)
  const [passo, setPasso] = useState(0)
  const [baixandoPdf, setBaixandoPdf] = useState(false)
  const [dados, setDados] = useState<ApostilaData | null>(null)
  const [erro, setErro] = useState('')

  function toggleTipo(val: string) {
    setTipos(prev => ({ ...prev, [val]: !prev[val] }))
  }

  function toggleExtra(id: string) {
    setExtras(prev => ({ ...prev, [id]: !prev[id] }))
  }

  async function gerar() {
    if (!tema.trim() || !nivel) return
    setGerando(true)
    setErro('')
    setDados(null)
    setPasso(1)

    const tiposSel = TIPOS_ATIVIDADE.filter(t => tipos[t.val]).map(t => t.val)
    const extrasSel = EXTRAS.filter(e => extras[e.id]).map(e => e.id)

    const interval = setInterval(() => {
      setPasso(p => (p < PASSOS.length ? p + 1 : p))
    }, 1000)

    try {
      const res = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 8000,
          system: `Você é especialista em educação brasileira. Gere apostilas pedagógicas completas.
REGRAS ABSOLUTAS:
- Retorne SOMENTE o objeto JSON, começando com { e terminando com }.
- Proibido markdown, blocos de código ou qualquer texto fora do JSON.
- Nunca infantilize conteúdo para adultos (EJA). Linguagem adulta e contextualizada.`,
          messages: [{ role: 'user', content: buildPrompt(tema, nivel, disciplina, objetivo, obs, tiposSel, extrasSel) }],
        }),
      })

      const json = await res.json()
      const raw = json.content?.[0]?.text || ''
      const parsed = extractJSON(raw)
      setDados(parsed)
    } catch (e) {
      console.error(e)
      setErro('Erro ao gerar. Verifique sua conexão e tente novamente.')
    } finally {
      clearInterval(interval)
      setGerando(false)
      setPasso(0)
    }
  }

  async function baixarPdf() {
    if (!dados) return
    setBaixandoPdf(true)
    try {
      const config = getTemplateConfig(templatePorNivel(nivel))
      const dataStr = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
      const nomeArquivo = dados.titulo.replace(/[^a-zA-Z0-9\s]/g, '').trim().replace(/\s+/g, '_') || 'apostila'

      const blob = await pdf(
        <PdfApostilaDoc dados={dados} config={config} data={dataStr} />
      ).toBlob()

      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `DoceriaPedagogica_${nomeArquivo}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (e) {
      console.error(e)
    } finally {
      setBaixandoPdf(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f0e8] flex flex-col" style={{ fontFamily: 'Outfit, sans-serif' }}>
      {/* Topbar */}
      <div className="bg-[#0f0e0c] px-8 h-14 flex items-center justify-between flex-shrink-0">
        <span className="font-bold text-[#faf7f2] text-lg flex items-center gap-2" style={{ fontFamily: 'Playfair Display, serif' }}>
          <span className="w-7 h-7 bg-[#c8963e] rounded-lg flex items-center justify-center text-sm">✦</span>
          DoceriaPedagógica
        </span>
        <div className="flex items-center gap-4">
          <Link href="/gerador.html" className="text-white/50 text-sm hover:text-white/80 transition-colors">✏️ Atividade</Link>
          <span className="text-[#e8b86d] text-sm font-semibold">📚 Apostila</span>
          <Link href="/conta.html" className="text-white/50 text-sm hover:text-white transition-colors">← Painel</Link>
        </div>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Formulário */}
        <div className="w-[400px] flex-shrink-0 bg-[#faf7f2] border-r border-black/10 overflow-y-auto p-7">

          <div className="mb-6">
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#8a8785] mb-3 flex items-center gap-2 after:flex-1 after:h-px after:bg-black/10">
              Conteúdo
            </div>

            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#8a8785] mb-1.5">
              Tema <span className="text-[#d95f3b]">*</span>
            </label>
            <input
              className="w-full border-[1.5px] border-black/15 rounded-lg px-3 py-2.5 text-sm bg-white mb-4 focus:outline-none focus:border-[#c8963e] focus:shadow-[0_0_0_3px_rgba(200,150,62,0.1)]"
              placeholder="Ex: Sistema Solar e Planetas"
              value={tema}
              onChange={e => setTema(e.target.value)}
            />

            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#8a8785] mb-1.5">
              Nível / público <span className="text-[#d95f3b]">*</span>
            </label>
            <select
              className="w-full border-[1.5px] border-black/15 rounded-lg px-3 py-2.5 text-sm bg-white mb-4 focus:outline-none focus:border-[#c8963e]"
              value={nivel}
              onChange={e => setNivel(e.target.value)}
            >
              <option value="">Selecione...</option>
              {NIVEIS.map(n => <option key={n.val} value={n.val}>{n.label}</option>)}
            </select>

            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#8a8785] mb-1.5">
              Disciplina / área
            </label>
            <input
              className="w-full border-[1.5px] border-black/15 rounded-lg px-3 py-2.5 text-sm bg-white mb-4 focus:outline-none focus:border-[#c8963e]"
              placeholder="Ex: Ciências, Português, Matemática..."
              value={disciplina}
              onChange={e => setDisciplina(e.target.value)}
            />

            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#8a8785] mb-1.5">
              Objetivo de aprendizagem
            </label>
            <textarea
              className="w-full border-[1.5px] border-black/15 rounded-lg px-3 py-2.5 text-sm bg-white mb-4 focus:outline-none focus:border-[#c8963e] resize-y min-h-[70px] leading-relaxed"
              placeholder="Ex: Identificar os planetas do sistema solar..."
              value={objetivo}
              onChange={e => setObjetivo(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#8a8785] mb-3 flex items-center gap-2 after:flex-1 after:h-px after:bg-black/10">
              Atividades incluídas
            </div>
            <div className="flex flex-wrap gap-1.5">
              {TIPOS_ATIVIDADE.map(t => (
                <button
                  key={t.val}
                  onClick={() => toggleTipo(t.val)}
                  className={`px-3 py-1.5 rounded-full text-[12px] border-[1.5px] transition-all ${
                    tipos[t.val]
                      ? 'bg-[#e8f4f4] text-[#2d6e6e] border-[#2d6e6e] font-semibold'
                      : 'bg-white text-[#8a8785] border-black/15 hover:bg-[#f5f0e8]'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#8a8785] mb-3 flex items-center gap-2 after:flex-1 after:h-px after:bg-black/10">
              Seções extras
            </div>
            {EXTRAS.map(e => (
              <div key={e.id} className="flex items-center justify-between py-2.5 border-b border-black/8 last:border-0">
                <div>
                  <div className="text-[13px] text-[#4a4845]">{e.label}</div>
                  <div className="text-[11px] text-[#8a8785]">{e.sub}</div>
                </div>
                <button
                  onClick={() => toggleExtra(e.id)}
                  className={`w-9 h-5 rounded-full relative transition-colors flex-shrink-0 ${extras[e.id] ? 'bg-[#2d6e6e]' : 'bg-black/20'}`}
                >
                  <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${extras[e.id] ? 'translate-x-4' : 'translate-x-0.5'}`} />
                </button>
              </div>
            ))}
          </div>

          <div className="mb-4">
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#8a8785] mb-1.5">
              Obs. adicionais
            </label>
            <input
              className="w-full border-[1.5px] border-black/15 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-[#c8963e]"
              placeholder="Ex: Linguagem adulta, sem infantilizar..."
              value={obs}
              onChange={e => setObs(e.target.value)}
            />
          </div>

          <hr className="border-black/10 my-5" />

          <button
            onClick={gerar}
            disabled={gerando || !tema.trim() || !nivel}
            className="w-full py-3.5 bg-[#c8963e] text-white rounded-xl font-semibold text-[15px] hover:bg-[#b5842e] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {gerando ? (
              <>
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Gerando...
              </>
            ) : '✦ Gerar apostila completa'}
          </button>

          {gerando && passo > 0 && (
            <div className="mt-4">
              <div className="h-1 bg-black/10 rounded-full overflow-hidden mb-3">
                <div
                  className="h-full bg-gradient-to-r from-[#2d6e6e] to-[#c8963e] rounded-full transition-all duration-500"
                  style={{ width: `${Math.round((passo / PASSOS.length) * 90)}%` }}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                {PASSOS.map((p, i) => (
                  <div key={i} className={`flex items-center gap-2 text-[12px] transition-colors ${i + 1 < passo ? 'text-[#2d6e6e]' : i + 1 === passo ? 'text-[#2d6e6e] font-semibold' : 'text-[#8a8785]'}`}>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center text-[8px] flex-shrink-0 ${i + 1 < passo ? 'border-[#2d6e6e] bg-[#2d6e6e] text-white' : i + 1 === passo ? 'border-[#2d6e6e] bg-[#e8f4f4]' : 'border-black/15'}`}>
                      {i + 1 < passo ? '✓' : i + 1}
                    </div>
                    {p}
                  </div>
                ))}
              </div>
            </div>
          )}

          {erro && <p className="text-red-600 text-sm mt-3">{erro}</p>}
        </div>

        {/* Prévia */}
        <div className="flex-1 overflow-y-auto p-7">
          {!dados ? (
            <div className="flex flex-col items-center justify-center min-h-[500px] text-center text-[#8a8785]">
              <div className="text-5xl mb-4 opacity-30">📚</div>
              <div className="text-[22px] font-bold text-[#4a4845] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                Sua apostila aparece aqui
              </div>
              <div className="text-[14px] leading-relaxed max-w-[300px]">
                Configure ao lado e clique em <strong>Gerar apostila completa</strong> — capa, texto, atividades e fechamento prontos em segundos.
              </div>
            </div>
          ) : (
            <>
              {/* Header da prévia */}
              <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <div>
                  <div className="text-lg font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>{dados.titulo}</div>
                  <div className="text-[12px] text-[#8a8785] mt-0.5">
                    {dados.nivel} • {dados.disciplina} • {dados.atividades?.length || 0} atividades
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={gerar}
                    disabled={gerando}
                    className="border-[1.5px] border-black/15 bg-white text-[#4a4845] px-4 py-2 rounded-lg text-[13px] hover:bg-[#f5f0e8] transition-colors"
                  >
                    ↻ Gerar novamente
                  </button>
                  <button
                    onClick={baixarPdf}
                    disabled={baixandoPdf}
                    className="bg-[#0f0e0c] text-white px-5 py-2 rounded-lg text-[13px] font-semibold hover:bg-[#2a2926] disabled:opacity-50 transition-colors flex items-center gap-2"
                  >
                    {baixandoPdf ? '⏳ Gerando PDF...' : '⬇ Baixar PDF'}
                  </button>
                </div>
              </div>

              {/* Conteúdo da apostila em preview simplificado */}
              <div className="max-w-[800px] mx-auto space-y-4">
                {/* Capa */}
                <div className="bg-white rounded-xl shadow-sm border-t-4 border-[#c8963e] p-10">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#8a8785] mb-3">DoceriaPedagógica — Material Didático</div>
                  <div className="text-3xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>{dados.titulo}</div>
                  {dados.subtitulo && <div className="text-[14px] text-[#8a8785] mb-4">{dados.subtitulo}</div>}
                  <div className="flex gap-2 flex-wrap mb-6">
                    <span className="bg-[#f5f0e8] border border-black/10 rounded px-3 py-1 text-[12px]">📚 {dados.nivel}</span>
                    <span className="bg-[#f5f0e8] border border-black/10 rounded px-3 py-1 text-[12px]">📋 {dados.disciplina}</span>
                  </div>
                  <div className="border-[1.5px] border-black/15 rounded-lg flex text-[13px] text-[#4a4845]">
                    <span className="flex-1 px-4 py-2.5 border-r border-black/15">Nome: _________________________________</span>
                    <span className="px-4 py-2.5">Turma: _______________</span>
                  </div>
                </div>

                {/* Introdução */}
                <div className="bg-white rounded-xl shadow-sm p-8">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#2d6e6e] mb-3 pb-2 border-b border-[#e8f4f4]">Introdução</div>
                  <div className="text-[19px] font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>{dados.introducao_titulo || 'Vamos começar'}</div>
                  {dados.introducao_texto?.split('\n').filter(p => p.trim()).slice(0, 2).map((p, i) => (
                    <p key={i} className="text-[14px] leading-relaxed text-black mb-3">{p}</p>
                  ))}
                  {dados.introducao_texto?.split('\n').filter(p => p.trim()).length > 2 && (
                    <p className="text-[12px] text-[#8a8785]">[+ {dados.introducao_texto.split('\n').filter(p => p.trim()).length - 2} parágrafos...]</p>
                  )}
                  {dados.destaque && (
                    <div className="bg-[#fdf3e3] border-l-4 border-[#c8963e] rounded-r-lg p-4 mt-4">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#c8963e] mb-1">💡 {dados.destaque.titulo}</div>
                      <div className="text-[13px] text-[#4a4845] leading-relaxed">{dados.destaque.texto}</div>
                    </div>
                  )}
                  {dados.mapa_mental && (
                    <div className="mt-4 p-4 bg-[#f5f0e8] rounded-lg text-center">
                      <span className="inline-block bg-[#2d6e6e] text-white px-4 py-1.5 rounded text-[13px] font-semibold mb-3">{dados.mapa_mental.centro}</span>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {dados.mapa_mental.ramos.map((r, i) => (
                          <span key={i} className="bg-[#e8f4f4] border border-[#2d6e6e]/20 rounded px-3 py-1 text-[12px] text-[#2d6e6e]">{r}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Atividades */}
                <div className="bg-white rounded-xl shadow-sm p-8">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#2d6e6e] mb-4 pb-2 border-b border-[#e8f4f4]">Atividades</div>
                  {dados.atividades?.map((at, i) => (
                    <div key={i} className="border-[1.5px] border-black/10 rounded-lg p-4 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-[#c8963e] text-white flex items-center justify-center text-[11px] font-bold">{at.numero}</div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#2d6e6e]">{at.tipo}</span>
                      </div>
                      <div className="text-[13px] text-black leading-relaxed">{at.enunciado?.replace(/\\n/g, ' ').slice(0, 150)}{(at.enunciado?.length || 0) > 150 ? '...' : ''}</div>
                    </div>
                  ))}
                </div>

                {/* Fechamento */}
                <div className="bg-[#e8f4f4] border-2 border-[#2d6e6e] rounded-xl p-7">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#4a9b9b] mb-2">Fechamento</div>
                  <div className="text-[19px] font-bold text-[#2d6e6e] mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>{dados.fechamento_titulo || 'Para refletir'}</div>
                  <p className="text-[13px] text-[#2d6e6e] leading-relaxed">{dados.fechamento_texto?.split('\n')[0]}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
