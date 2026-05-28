import React from 'react';
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import type { ApostilaData, AtividadeData } from '../../apostila/types';
import type { TemplateConfig } from '../../templates/types/template.types';

interface Props {
  dados: ApostilaData;
  config: TemplateConfig;
  data: string;
}

const LETRAS_OPCOES = ['A', 'B', 'C', 'D', 'E'];

function cleanText(text: string): string {
  return (text || '')
    .replace(/[.,;]?\s*USE CAIXA ALTA\.?/gi, '')
    .replace(/[.,;]?\s*Escreva em (caixa alta|maiúsculas?)\.?/gi, '')
    .trim();
}

export function PdfApostilaDoc({ dados, config, data }: Props) {
  const mg = {
    paddingTop: config.pagina.margemSuperior,
    paddingBottom: config.pagina.margemInferior,
    paddingLeft: config.pagina.margemEsquerda,
    paddingRight: config.pagina.margemDireita,
  };

  const s = StyleSheet.create({
    page: { backgroundColor: '#ffffff', ...mg },
    rodape: {
      position: 'absolute',
      bottom: 18,
      left: config.pagina.margemEsquerda,
      right: config.pagina.margemDireita,
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderTopWidth: 0.5,
      borderTopColor: '#cccccc',
      paddingTop: 4,
    },
    rodapeTxt: { fontSize: 8, color: '#aaaaaa', fontFamily: config.tipografia.fonteCorpo },

    // Capa
    capaHeader: {
      borderTopWidth: 5,
      borderTopColor: config.cores.primaria,
      paddingTop: 16,
      marginBottom: 20,
    },
    capaLabel: {
      fontSize: 8,
      fontFamily: config.tipografia.fonteTitulo,
      color: config.cores.secundaria,
      textTransform: 'uppercase',
      letterSpacing: 1.2,
      marginBottom: 10,
    },
    capaTitulo: {
      fontSize: config.tipografia.tamanhoTitulo + 4,
      fontFamily: config.tipografia.fonteTitulo,
      color: config.cores.primaria,
      marginBottom: 6,
      lineHeight: 1.2,
    },
    capaSubtitulo: {
      fontSize: config.tipografia.tamanhoSubtitulo,
      fontFamily: config.tipografia.fonteCorpo,
      color: '#888888',
      marginBottom: 16,
    },
    capaTags: { flexDirection: 'row', gap: 8, marginBottom: 20, flexWrap: 'wrap' },
    capaTag: {
      borderWidth: 1,
      borderColor: '#cccccc',
      borderRadius: 4,
      paddingHorizontal: 10,
      paddingVertical: 4,
      fontSize: 10,
      fontFamily: config.tipografia.fonteCorpo,
      color: '#555555',
    },
    camposAluno: {
      borderWidth: 1.5,
      borderColor: '#cccccc',
      borderRadius: 6,
      flexDirection: 'row',
    },
    campoAluno: {
      flex: 1,
      paddingHorizontal: 12,
      paddingVertical: 9,
      borderRightWidth: 1,
      borderRightColor: '#cccccc',
      fontSize: 11,
      fontFamily: config.tipografia.fonteCorpo,
      color: '#333333',
    },

    // Seções
    secaoLabel: {
      fontSize: 8,
      fontFamily: config.tipografia.fonteTitulo,
      color: config.cores.primaria,
      textTransform: 'uppercase',
      letterSpacing: 1,
      marginBottom: 8,
      paddingBottom: 4,
      borderBottomWidth: 1,
      borderBottomColor: config.cores.destaque,
    },
    secaoTitulo: {
      fontSize: config.tipografia.tamanhoSubtitulo,
      fontFamily: config.tipografia.fonteTitulo,
      color: config.cores.primaria,
      marginBottom: 10,
    },
    paragrafo: {
      fontSize: config.tipografia.tamanhoCorpo,
      fontFamily: config.tipografia.fonteCorpo,
      color: '#000000',
      lineHeight: config.tipografia.alturaDeLinha,
      marginBottom: 8,
    },

    // Destaque
    destaqueWrap: {
      backgroundColor: '#fdf3e3',
      borderLeftWidth: 4,
      borderLeftColor: '#c8963e',
      borderRadius: 4,
      paddingHorizontal: 14,
      paddingVertical: 10,
      marginVertical: 12,
    },
    destaqueLabel: {
      fontSize: 8,
      fontFamily: config.tipografia.fonteTitulo,
      color: '#c8963e',
      textTransform: 'uppercase',
      letterSpacing: 0.8,
      marginBottom: 4,
    },
    destaqueTxt: {
      fontSize: 11,
      fontFamily: config.tipografia.fonteCorpo,
      color: '#4a4845',
      lineHeight: 1.6,
    },

    // Mapa mental
    mapaWrap: { marginVertical: 12 },
    mapaCentro: {
      alignSelf: 'center',
      backgroundColor: config.cores.primaria,
      paddingHorizontal: 16,
      paddingVertical: 7,
      borderRadius: 6,
      marginBottom: 10,
    },
    mapaCentroTxt: {
      fontSize: 12,
      fontFamily: config.tipografia.fonteTitulo,
      color: '#ffffff',
      textAlign: 'center',
    },
    mapaRamos: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
    mapaRamo: {
      backgroundColor: config.cores.destaque,
      borderWidth: 1,
      borderColor: config.cores.primaria,
      borderRadius: 4,
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    mapaRamoTxt: {
      fontSize: 10,
      fontFamily: config.tipografia.fonteCorpo,
      color: config.cores.primaria,
    },

    // Atividade
    atividadeWrap: {
      borderWidth: 1.5,
      borderColor: '#e0dbd4',
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 14,
      marginBottom: 14,
    },
    atividadeHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 },
    atividadeNum: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: config.cores.primaria,
      justifyContent: 'center',
      alignItems: 'center',
    },
    atividadeNumTxt: { fontSize: 11, fontFamily: config.tipografia.fonteTitulo, color: '#ffffff' },
    atividadeTipo: {
      fontSize: 9,
      fontFamily: config.tipografia.fonteTitulo,
      color: config.cores.primaria,
      textTransform: 'uppercase',
      letterSpacing: 0.8,
    },
    atividadeQ: {
      fontSize: config.tipografia.tamanhoQuestao,
      fontFamily: config.tipografia.fonteCorpo,
      color: '#000000',
      lineHeight: 1.7,
      marginBottom: 10,
    },

    // Linhas de resposta
    linhaResposta: {
      borderBottomWidth: 1.5,
      borderBottomStyle: 'dotted',
      borderBottomColor: '#888888',
      marginBottom: config.espacamento.linhasResposta,
    },

    // Caixa de resposta
    caixaResposta: {
      borderWidth: 1.5,
      borderColor: '#cccccc',
      borderRadius: 5,
      minHeight: 80,
      marginTop: 4,
    },

    // Múltipla escolha
    opcaoWrap: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6, gap: 8 },
    opcaoBolinha: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 1.5,
      borderColor: '#555555',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 1,
    },
    opcaoLetra: {
      fontSize: 10,
      fontFamily: config.tipografia.fonteTitulo,
      color: '#333333',
    },
    opcaoTxt: {
      fontSize: config.tipografia.tamanhoQuestao,
      fontFamily: config.tipografia.fonteCorpo,
      color: '#000000',
      flex: 1,
      lineHeight: 1.5,
    },

    // V ou F
    vfItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 4,
      borderBottomWidth: 0.5,
      borderBottomColor: '#cccccc',
      gap: 10,
    },
    vfBoxes: { flexDirection: 'row', gap: 3 },
    vfBox: {
      width: 22,
      height: 22,
      borderWidth: 1.5,
      borderColor: '#555555',
      borderRadius: 3,
      justifyContent: 'center',
      alignItems: 'center',
    },
    vfBoxTxt: { fontSize: 10, fontFamily: config.tipografia.fonteTitulo, color: '#555555' },
    vfFrase: {
      fontSize: config.tipografia.tamanhoQuestao,
      fontFamily: config.tipografia.fonteCorpo,
      color: '#000000',
      flex: 1,
      lineHeight: 1.5,
    },

    // Fechamento
    fechamentoWrap: {
      backgroundColor: '#e8f4f4',
      borderWidth: 2,
      borderColor: '#2d6e6e',
      borderRadius: 8,
      paddingHorizontal: 28,
      paddingVertical: 24,
      marginBottom: 16,
    },
    fechamentoLabel: {
      fontSize: 8,
      fontFamily: config.tipografia.fonteTitulo,
      color: '#4a9b9b',
      textTransform: 'uppercase',
      letterSpacing: 1,
      marginBottom: 8,
    },
    fechamentoTitulo: {
      fontSize: config.tipografia.tamanhoSubtitulo,
      fontFamily: config.tipografia.fonteTitulo,
      color: '#2d6e6e',
      marginBottom: 10,
    },
    fechamentoTxt: {
      fontSize: config.tipografia.tamanhoCorpo,
      fontFamily: config.tipografia.fonteCorpo,
      color: '#2d6e6e',
      lineHeight: config.tipografia.alturaDeLinha,
      marginBottom: 6,
    },

    // Orientação professor
    orientacaoWrap: {
      backgroundColor: '#f0eeff',
      borderLeftWidth: 4,
      borderLeftColor: '#6c63d4',
      borderRadius: 4,
      paddingHorizontal: 14,
      paddingVertical: 10,
      marginVertical: 10,
    },
    orientacaoLabel: {
      fontSize: 8,
      fontFamily: config.tipografia.fonteTitulo,
      color: '#6c63d4',
      textTransform: 'uppercase',
      letterSpacing: 0.8,
      marginBottom: 4,
    },
    orientacaoTxt: {
      fontSize: 10,
      fontFamily: config.tipografia.fonteCorpo,
      color: '#4a4880',
      lineHeight: 1.6,
    },

    // Palavras-chave
    pcWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 10 },
    pcTag: {
      backgroundColor: '#f5f0e8',
      borderWidth: 1,
      borderColor: '#cccccc',
      borderRadius: 12,
      paddingHorizontal: 10,
      paddingVertical: 3,
      fontSize: 10,
      fontFamily: config.tipografia.fonteCorpo,
      color: '#8a8785',
    },

    // Música
    musicaWrap: {
      backgroundColor: '#fdf3e3',
      borderRadius: 8,
      borderLeftWidth: 4,
      borderLeftColor: '#c8963e',
      paddingHorizontal: 20,
      paddingVertical: 16,
    },
    musicaVerso: {
      fontSize: config.tipografia.tamanhoCorpo,
      fontFamily: config.tipografia.fonteCorpo,
      color: '#4a4845',
      lineHeight: 2,
    },
  });

  function renderAtividade(at: AtividadeData) {
    const enunciado = cleanText(at.enunciado).replace(/\\n/g, '\n');

    let respostaEl: React.ReactNode = null;

    if (at.tipo_resposta === 'caixa') {
      respostaEl = <View style={s.caixaResposta} />;
    } else if (at.tipo_resposta === 'opcoes' && at.opcoes?.length) {
      respostaEl = (
        <View style={{ marginTop: 6 }}>
          {at.opcoes.map((op, oi) => (
            <View key={oi} style={s.opcaoWrap}>
              <View style={s.opcaoBolinha}>
                <Text style={s.opcaoLetra}>{LETRAS_OPCOES[oi]}</Text>
              </View>
              <Text style={s.opcaoTxt}>{op.replace(/^[A-Ea-e]\)\s*/, '')}</Text>
            </View>
          ))}
        </View>
      );
    } else if (at.tipo_resposta === 'vf' && at.itens_vf?.length) {
      respostaEl = (
        <View style={{ marginTop: 8 }}>
          {at.itens_vf.map((frase, fi) => (
            <View key={fi} style={s.vfItem}>
              <View style={s.vfBoxes}>
                <View style={s.vfBox}><Text style={s.vfBoxTxt}>V</Text></View>
                <View style={s.vfBox}><Text style={s.vfBoxTxt}>F</Text></View>
              </View>
              <Text style={s.vfFrase}>{frase}</Text>
            </View>
          ))}
        </View>
      );
    } else {
      const n = Math.max(at.linhas || 3, 2);
      respostaEl = (
        <View style={{ marginTop: 8 }}>
          {Array.from({ length: n }).map((_, i) => (
            <View key={i} style={s.linhaResposta} />
          ))}
        </View>
      );
    }

    return (
      <View key={at.numero} style={s.atividadeWrap} wrap={false}>
        <View style={s.atividadeHeader}>
          <View style={s.atividadeNum}>
            <Text style={s.atividadeNumTxt}>{at.numero}</Text>
          </View>
          <Text style={s.atividadeTipo}>{at.tipo}</Text>
        </View>
        <Text style={s.atividadeQ}>{enunciado}</Text>
        {respostaEl}
      </View>
    );
  }

  const pargsFech = (dados.fechamento_texto || '').split('\n').filter(p => p.trim());
  const pargsIntro = (dados.introducao_texto || '').split('\n').filter(p => p.trim());

  return (
    <Document>
      <Page size="A4" style={s.page}>

        {/* ── CAPA ── */}
        <View style={s.capaHeader}>
          <Text style={s.capaLabel}>DoceriaPedagógica — Material Didático</Text>
          <Text style={s.capaTitulo}>{dados.titulo}</Text>
          {dados.subtitulo && <Text style={s.capaSubtitulo}>{dados.subtitulo}</Text>}
          <View style={s.capaTags}>
            <Text style={s.capaTag}>📚 {dados.nivel}</Text>
            <Text style={s.capaTag}>📋 {dados.disciplina}</Text>
            <Text style={s.capaTag}>📅 {data}</Text>
          </View>
          <View style={s.camposAluno}>
            <Text style={s.campoAluno}>Nome: _________________________________</Text>
            <Text style={[s.campoAluno, { flex: 0.5 }]}>Turma: _______________</Text>
            <Text style={[s.campoAluno, { flex: 0.5, borderRightWidth: 0 }]}>Data: _______________</Text>
          </View>
        </View>

        {/* ── INTRODUÇÃO ── */}
        <View break>
          <Text style={s.secaoLabel}>Introdução</Text>
          <Text style={s.secaoTitulo}>{dados.introducao_titulo || 'Vamos começar'}</Text>
          {pargsIntro.map((p, i) => <Text key={i} style={s.paragrafo}>{p}</Text>)}

          {dados.destaque && (
            <View style={s.destaqueWrap}>
              <Text style={s.destaqueLabel}>💡 {dados.destaque.titulo || 'Destaque'}</Text>
              <Text style={s.destaqueTxt}>{dados.destaque.texto}</Text>
            </View>
          )}

          {dados.mapa_mental && (
            <View style={s.mapaWrap}>
              <Text style={[s.secaoLabel, { marginTop: 12 }]}>Mapa Mental</Text>
              <View style={s.mapaCentro}>
                <Text style={s.mapaCentroTxt}>{dados.mapa_mental.centro}</Text>
              </View>
              <View style={s.mapaRamos}>
                {dados.mapa_mental.ramos.map((r, i) => (
                  <View key={i} style={s.mapaRamo}>
                    <Text style={s.mapaRamoTxt}>{r}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* ── ATIVIDADES ── */}
        <View break>
          <Text style={[s.secaoLabel, { marginBottom: 14 }]}>Atividades</Text>
          {dados.atividades.map(at => renderAtividade(at))}
        </View>

        {/* ── MÚSICA ── */}
        {dados.musica && (
          <View break>
            <Text style={s.secaoLabel}>🎵 {dados.musica.tipo || 'Música Pedagógica'}</Text>
            <Text style={s.secaoTitulo}>Aprendendo com música</Text>
            <View style={s.musicaWrap}>
              {dados.musica.letra.split('\n').filter(v => v.trim()).map((v, i) => (
                <Text key={i} style={s.musicaVerso}>{v}</Text>
              ))}
            </View>
          </View>
        )}

        {/* ── FECHAMENTO ── */}
        <View break>
          <View style={s.fechamentoWrap}>
            <Text style={s.fechamentoLabel}>Fechamento</Text>
            <Text style={s.fechamentoTitulo}>{dados.fechamento_titulo || 'Para refletir'}</Text>
            {pargsFech.map((p, i) => <Text key={i} style={s.fechamentoTxt}>{p}</Text>)}
          </View>

          {dados.orientacao_professor && (
            <View style={s.orientacaoWrap}>
              <Text style={s.orientacaoLabel}>Orientação ao professor</Text>
              <Text style={s.orientacaoTxt}>{dados.orientacao_professor}</Text>
            </View>
          )}

          {dados.palavras_chave?.length ? (
            <View>
              <Text style={[s.secaoLabel, { marginTop: 12 }]}>Palavras-chave</Text>
              <View style={s.pcWrap}>
                {dados.palavras_chave.map((pc, i) => (
                  <Text key={i} style={s.pcTag}>{pc}</Text>
                ))}
              </View>
            </View>
          ) : null}
        </View>

        {/* Rodapé fixo */}
        <View style={s.rodape} fixed>
          <Text style={s.rodapeTxt}>Doceria Pedagógica</Text>
          <Text style={s.rodapeTxt}>{dados.titulo}</Text>
          <Text style={s.rodapeTxt} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
        </View>
      </Page>
    </Document>
  );
}
