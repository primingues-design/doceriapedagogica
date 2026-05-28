import React from 'react';
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import type { BlocoCacaPalavras, CelulaCacaPalavras } from '../../types/pdf.types';
import type { TemplateConfig } from '../../templates/types/template.types';

export interface WordObj {
  texto: string;
  dica?: string;
}

interface Props {
  titulo: string;
  nivel: string;
  dirLabel: string;
  wordObjs: WordObj[];
  bloco: BlocoCacaPalavras;
  gabarito: CelulaCacaPalavras[][];
  config: TemplateConfig;
  data: string;
}

export function PdfCacaPalavrasDoc({ titulo, nivel, dirLabel, wordObjs, bloco, gabarito, config, data }: Props) {
  const tamanhoGrade = bloco.grid[0].length;
  const margH = config.pagina.margemEsquerda + config.pagina.margemDireita;
  const largDisp = 595 - margH - 4;
  const tamanhoCelula = Math.min(32, Math.floor(largDisp / tamanhoGrade));
  const tamanhoFonteGrade = Math.floor(tamanhoCelula * 0.48);

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
      marginBottom: 18,
    },
    labelTopo: {
      fontSize: 8,
      fontFamily: config.tipografia.fonteTitulo,
      color: config.cores.secundaria,
      textTransform: 'uppercase',
      letterSpacing: 1,
      marginBottom: 4,
    },
    titulo: {
      fontSize: config.tipografia.tamanhoTitulo,
      fontFamily: config.tipografia.fonteTitulo,
      color: config.cores.primaria,
      marginBottom: 4,
    },
    meta: {
      fontSize: 10,
      fontFamily: config.tipografia.fonteCorpo,
      color: '#888888',
    },
    gridWrap: {
      alignItems: 'center',
      marginBottom: 16,
    },
    linhaCelulas: {
      flexDirection: 'row',
    },
    celula: {
      width: tamanhoCelula,
      height: tamanhoCelula,
      borderWidth: 1,
      borderColor: '#cccccc',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff',
    },
    celulaDestacada: {
      backgroundColor: '#d1fae5',
      borderColor: '#34d399',
    },
    letraCelula: {
      fontSize: tamanhoFonteGrade,
      fontFamily: config.tipografia.fonteTitulo,
      color: '#000000',
      textAlign: 'center',
    },
    letraCelulaDestacada: {
      color: '#065f46',
    },
    tituloLista: {
      fontSize: 9,
      fontFamily: config.tipografia.fonteTitulo,
      color: config.cores.secundaria,
      textTransform: 'uppercase',
      letterSpacing: 1,
      marginBottom: 8,
    },
    listaWrap: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    wordItem: {
      width: '50%',
      paddingBottom: 6,
      paddingRight: 8,
    },
    wordTexto: {
      fontSize: 11,
      fontFamily: config.tipografia.fonteTitulo,
      color: config.cores.texto,
    },
    wordDica: {
      fontSize: 9,
      fontFamily: config.tipografia.fonteCorpo,
      color: '#888888',
    },
    camposAluno: {
      flexDirection: 'row',
      gap: 24,
      marginTop: 16,
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: '#eeeeee',
    },
    campo: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    labelCampo: {
      fontSize: 10,
      fontFamily: config.tipografia.fonteTitulo,
      color: '#888888',
      marginRight: 4,
    },
    linhaCampo: {
      flex: 1,
      borderBottomWidth: 1,
      borderBottomColor: '#cccccc',
      height: 16,
    },
    rodape: {
      position: 'absolute',
      bottom: 20,
      left: config.pagina.margemEsquerda,
      right: config.pagina.margemDireita,
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderTopWidth: 0.5,
      borderTopColor: '#cccccc',
      paddingTop: 5,
    },
    rodapeTexto: {
      fontSize: 8,
      color: '#aaaaaa',
    },
    tituloGabarito: {
      color: '#d95f3b',
    },
    bordaGabarito: {
      borderTopColor: '#d95f3b',
    },
    celulaGabDestacada: {
      backgroundColor: '#d1fae5',
      borderColor: '#34d399',
    },
  });

  function renderGrid(cells: CelulaCacaPalavras[][], ehGabarito = false) {
    return (
      <View style={styles.gridWrap}>
        {cells.map((linha, li) => (
          <View key={li} style={styles.linhaCelulas}>
            {linha.map((celula, ci) => (
              <View
                key={ci}
                style={[
                  styles.celula,
                  celula.destacada ? (ehGabarito ? styles.celulaGabDestacada : styles.celulaDestacada) : {},
                ]}
              >
                <Text
                  style={[
                    styles.letraCelula,
                    celula.destacada ? styles.letraCelulaDestacada : {},
                  ]}
                >
                  {celula.letra.toUpperCase()}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    );
  }

  function renderListaPalavras() {
    return (
      <View style={styles.listaWrap}>
        {wordObjs.map((w, i) => (
          <View key={i} style={styles.wordItem}>
            <Text style={styles.wordTexto}>{w.texto.toUpperCase()}</Text>
            {w.dica && <Text style={styles.wordDica}>{w.dica}</Text>}
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
          <Text style={styles.labelTopo}>DoceriaPedagógica — Caça-Palavras</Text>
          <Text style={styles.titulo}>{titulo}</Text>
          <Text style={styles.meta}>
            {nivel} • {wordObjs.length} palavras • Grade {tamanhoGrade}×{tamanhoGrade} • Direções: {dirLabel} • {data}
          </Text>
        </View>

        {renderGrid(bloco.grid)}

        <Text style={styles.tituloLista}>Encontre as palavras:</Text>
        {renderListaPalavras()}

        <View style={styles.camposAluno}>
          <View style={styles.campo}>
            <Text style={styles.labelCampo}>Nome:</Text>
            <View style={styles.linhaCampo} />
          </View>
          <View style={[styles.campo, { flex: 0.5 }]}>
            <Text style={styles.labelCampo}>Data:</Text>
            <View style={styles.linhaCampo} />
          </View>
        </View>

        <View style={styles.rodape} fixed>
          <Text style={styles.rodapeTexto}>Doceria Pedagógica</Text>
          <Text style={styles.rodapeTexto}>Caça-palavras gerado por IA</Text>
          <Text style={styles.rodapeTexto}>{data}</Text>
        </View>
      </Page>

      {/* Página 2 — Gabarito do professor */}
      <Page size="A4" orientation="portrait" style={styles.pagina}>
        <View style={[styles.cabecalho, styles.bordaGabarito]}>
          <Text style={styles.labelTopo}>Gabarito — Uso do Professor</Text>
          <Text style={[styles.titulo, styles.tituloGabarito]}>{titulo}</Text>
          <Text style={styles.meta}>{data}</Text>
        </View>

        {renderGrid(gabarito, true)}

        <Text style={styles.tituloLista}>Palavras escondidas:</Text>
        {renderListaPalavras()}

        <View style={styles.rodape} fixed>
          <Text style={styles.rodapeTexto}>Doceria Pedagógica</Text>
          <Text style={styles.rodapeTexto}>Gabarito do professor</Text>
          <Text style={styles.rodapeTexto}>{data}</Text>
        </View>
      </Page>
    </Document>
  );
}
