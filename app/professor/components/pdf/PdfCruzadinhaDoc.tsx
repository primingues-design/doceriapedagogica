import React from 'react';
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import type { ResultadoCruzadinha, PosicaoPalavra } from '../../generators/cruzadinha';
import type { TemplateConfig } from '../../templates/types/template.types';

interface Props {
  titulo: string;
  nivel: string;
  resultado: ResultadoCruzadinha;
  config: TemplateConfig;
  data: string;
  isElementary: boolean;
}

export function PdfCruzadinhaDoc({ titulo, nivel, resultado, config, data, isElementary }: Props) {
  const { gridData, placements, colunas } = resultado;

  const margH = config.pagina.margemEsquerda + config.pagina.margemDireita;
  const availW = 595 - margH;
  const cluesW = 190;
  const gridMaxW = availW - cluesW - 12;
  const tamanhoCelula = Math.min(22, Math.floor(gridMaxW / colunas));

  const numeroPorPos: Record<string, number> = {};
  placements.forEach(pl => { numeroPorPos[`${pl.r},${pl.c}`] = pl.numero; });

  const horiz = placements.filter(p => p.direcao === 'H').sort((a, b) => a.numero - b.numero);
  const vert = placements.filter(p => p.direcao === 'V').sort((a, b) => a.numero - b.numero);

  const styles = StyleSheet.create({
    pagina: {
      backgroundColor: '#ffffff',
      paddingTop: config.pagina.margemSuperior,
      paddingBottom: config.pagina.margemInferior,
      paddingLeft: config.pagina.margemEsquerda,
      paddingRight: config.pagina.margemDireita,
    },
    cabecalho: {
      borderTopWidth: 4,
      borderTopColor: config.cores.primaria,
      paddingTop: 10,
      marginBottom: 16,
    },
    cabecalhoGaba: {
      borderTopColor: '#d95f3b',
    },
    labelTopo: {
      fontSize: 8,
      fontFamily: config.tipografia.fonteTitulo,
      color: config.cores.secundaria,
      textTransform: 'uppercase',
      letterSpacing: 1,
      marginBottom: 4,
    },
    tituloPdf: {
      fontSize: config.tipografia.tamanhoTitulo,
      fontFamily: config.tipografia.fonteTitulo,
      color: config.cores.primaria,
      marginBottom: 3,
    },
    tituloGaba: { color: '#d95f3b' },
    meta: {
      fontSize: 10,
      fontFamily: config.tipografia.fonteCorpo,
      color: '#888888',
    },
    corpo: {
      flexDirection: 'row',
      gap: 12,
    },
    gridWrap: { flexShrink: 0 },
    linha: { flexDirection: 'row' },
    celulaVazia: {
      width: tamanhoCelula,
      height: tamanhoCelula,
      backgroundColor: '#d4cfc8',
    },
    celulaAberta: {
      width: tamanhoCelula,
      height: tamanhoCelula,
      borderWidth: 1.5,
      borderColor: '#555555',
      backgroundColor: '#ffffff',
      justifyContent: 'center',
      alignItems: 'center',
    },
    numCelula: {
      position: 'absolute',
      top: 1,
      left: 1.5,
      fontSize: 5.5,
      fontFamily: config.tipografia.fonteTitulo,
      color: '#888888',
    },
    letraCelula: {
      fontSize: Math.floor(tamanhoCelula * 0.48),
      fontFamily: config.tipografia.fonteTitulo,
      color: '#2d6e6e',
    },
    cluesWrap: {
      width: cluesW,
      flexShrink: 0,
    },
    clueSecao: { marginBottom: 10 },
    clueSecaoTitulo: {
      fontSize: 8,
      fontFamily: config.tipografia.fonteTitulo,
      color: config.cores.secundaria,
      textTransform: 'uppercase',
      letterSpacing: 0.8,
      marginBottom: 5,
      borderBottomWidth: 0.5,
      borderBottomColor: '#cccccc',
      paddingBottom: 3,
    },
    clueItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      paddingVertical: 2.5,
      borderBottomWidth: 0.5,
      borderBottomColor: '#eeeeee',
    },
    clueNum: {
      fontSize: 8.5,
      fontFamily: config.tipografia.fonteTitulo,
      color: config.cores.primaria,
      minWidth: 18,
    },
    clueEmoji: {
      fontSize: 10,
      marginRight: 3,
    },
    clueTexto: {
      fontSize: 8.5,
      fontFamily: config.tipografia.fonteCorpo,
      color: '#333333',
      flex: 1,
      lineHeight: 1.3,
    },
    camposAluno: {
      flexDirection: 'row',
      gap: 20,
      marginTop: 12,
      paddingTop: 10,
      borderTopWidth: 0.5,
      borderTopColor: '#eeeeee',
    },
    campo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
    labelCampo: { fontSize: 9, fontFamily: config.tipografia.fonteTitulo, color: '#888888', marginRight: 4 },
    linhaCampo: { flex: 1, borderBottomWidth: 1, borderBottomColor: '#cccccc', height: 14 },
    rodape: {
      position: 'absolute',
      bottom: 20,
      left: config.pagina.margemEsquerda,
      right: config.pagina.margemDireita,
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderTopWidth: 0.5,
      borderTopColor: '#cccccc',
      paddingTop: 4,
    },
    rodapeTexto: { fontSize: 8, color: '#aaaaaa' },
  });

  function renderGrid(preenchida: boolean) {
    return (
      <View style={styles.gridWrap}>
        {gridData.map((linha, li) => (
          <View key={li} style={styles.linha}>
            {linha.map((celula, ci) =>
              celula === null ? (
                <View key={ci} style={styles.celulaVazia} />
              ) : (
                <View key={ci} style={styles.celulaAberta}>
                  {numeroPorPos[`${li},${ci}`] && (
                    <Text style={styles.numCelula}>{numeroPorPos[`${li},${ci}`]}</Text>
                  )}
                  {preenchida && (
                    <Text style={styles.letraCelula}>{celula}</Text>
                  )}
                </View>
              )
            )}
          </View>
        ))}
      </View>
    );
  }

  function renderClues(lista: PosicaoPalavra[], label: string) {
    if (!lista.length) return null;
    return (
      <View style={styles.clueSecao}>
        <Text style={styles.clueSecaoTitulo}>{label}</Text>
        {lista.map((p, i) => (
          <View key={i} style={styles.clueItem}>
            <Text style={styles.clueNum}>{p.numero}.</Text>
            {isElementary && p.emoji ? <Text style={styles.clueEmoji}>{p.emoji}</Text> : null}
            <Text style={styles.clueTexto}>{p.dica}</Text>
          </View>
        ))}
      </View>
    );
  }

  return (
    <Document>
      {/* Página 1 — Folha do aluno */}
      <Page size="A4" orientation="portrait" style={styles.pagina}>
        <View style={styles.cabecalho}>
          <Text style={styles.labelTopo}>DoceriaPedagógica — Cruzadinha</Text>
          <Text style={styles.tituloPdf}>{titulo}</Text>
          <Text style={styles.meta}>{nivel} • {placements.length} palavras • {data}</Text>
        </View>

        <View style={styles.corpo}>
          {renderGrid(false)}
          <View style={styles.cluesWrap}>
            {renderClues(horiz, 'Horizontais →')}
            {renderClues(vert, 'Verticais ↓')}
          </View>
        </View>

        <View style={styles.camposAluno}>
          <View style={styles.campo}>
            <Text style={styles.labelCampo}>Nome:</Text>
            <View style={styles.linhaCampo} />
          </View>
          <View style={[styles.campo, { flex: 0.45 }]}>
            <Text style={styles.labelCampo}>Data:</Text>
            <View style={styles.linhaCampo} />
          </View>
        </View>

        <View style={styles.rodape} fixed>
          <Text style={styles.rodapeTexto}>Doceria Pedagógica</Text>
          <Text style={styles.rodapeTexto}>Cruzadinha gerada por IA</Text>
          <Text style={styles.rodapeTexto}>{data}</Text>
        </View>
      </Page>

      {/* Página 2 — Gabarito */}
      <Page size="A4" orientation="portrait" style={styles.pagina}>
        <View style={[styles.cabecalho, styles.cabecalhoGaba]}>
          <Text style={styles.labelTopo}>Gabarito — Uso do Professor</Text>
          <Text style={[styles.tituloPdf, styles.tituloGaba]}>{titulo}</Text>
          <Text style={styles.meta}>{data}</Text>
        </View>

        <View style={styles.corpo}>
          {renderGrid(true)}
          <View style={styles.cluesWrap}>
            {renderClues(horiz, 'Horizontais →')}
            {renderClues(vert, 'Verticais ↓')}
          </View>
        </View>

        <View style={styles.rodape} fixed>
          <Text style={styles.rodapeTexto}>Doceria Pedagógica</Text>
          <Text style={styles.rodapeTexto}>Gabarito do professor</Text>
          <Text style={styles.rodapeTexto}>{data}</Text>
        </View>
      </Page>
    </Document>
  );
}
