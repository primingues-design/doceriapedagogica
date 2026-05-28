import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import type { BlocoCruzadinha } from '../../../types/pdf.types';
import type { TemplateConfig } from '../../../templates/types/template.types';

interface Props {
  bloco: BlocoCruzadinha;
  config: TemplateConfig;
}

export function PdfCruzadinha({ bloco, config }: Props) {
  const tamanhoCelula = 22;
  const tamanhoFonte = 11;

  const numeroPorPosicao: Record<string, number> = {};
  for (const p of bloco.palavras) {
    numeroPorPosicao[`${p.linha},${p.coluna}`] = p.numero;
  }

  const styles = StyleSheet.create({
    container: {
      marginBottom: config.espacamento.entreBlocos,
    },
    titulo: {
      fontSize: config.tipografia.tamanhoSubtitulo,
      fontFamily: config.tipografia.fonteTitulo,
      color: config.cores.primaria,
      marginBottom: 10,
      textAlign: 'center',
    },
    grade: {
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: 14,
    },
    linhaCruz: {
      flexDirection: 'row',
    },
    celulaNula: {
      width: tamanhoCelula,
      height: tamanhoCelula,
      backgroundColor: '#000000',
    },
    celulaAberta: {
      width: tamanhoCelula,
      height: tamanhoCelula,
      borderWidth: 1,
      borderColor: config.cores.bordas,
      backgroundColor: '#ffffff',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    numeroCell: {
      position: 'absolute',
      top: 1,
      left: 2,
      fontSize: 6,
      color: config.cores.primaria,
      fontFamily: config.tipografia.fonteTitulo,
    },
    dicasContainer: {
      flexDirection: 'row',
      gap: 16,
      marginTop: 8,
    },
    colunaDicas: {
      flex: 1,
    },
    tituloDicas: {
      fontSize: 11,
      fontFamily: config.tipografia.fonteTitulo,
      color: config.cores.primaria,
      marginBottom: 6,
      borderBottomWidth: 1,
      borderBottomColor: config.cores.bordas,
      paddingBottom: 3,
    },
    dica: {
      fontSize: 10,
      fontFamily: config.tipografia.fonteCorpo,
      color: config.cores.texto,
      marginBottom: 4,
      lineHeight: 1.4,
    },
  });

  const horizontais = bloco.palavras.filter(p => p.direcao === 'horizontal');
  const verticais = bloco.palavras.filter(p => p.direcao === 'vertical');

  return (
    <View style={styles.container} wrap={false}>
      {bloco.titulo && (
        <Text style={styles.titulo}>{bloco.titulo}</Text>
      )}
      <View style={styles.grade}>
        {bloco.grid.map((linha, li) => (
          <View key={li} style={styles.linhaCruz}>
            {linha.map((celula, ci) =>
              celula === null ? (
                <View key={ci} style={styles.celulaNula} />
              ) : (
                <View key={ci} style={styles.celulaAberta}>
                  {numeroPorPosicao[`${li},${ci}`] && (
                    <Text style={styles.numeroCell}>
                      {numeroPorPosicao[`${li},${ci}`]}
                    </Text>
                  )}
                </View>
              )
            )}
          </View>
        ))}
      </View>
      <View style={styles.dicasContainer}>
        {horizontais.length > 0 && (
          <View style={styles.colunaDicas}>
            <Text style={styles.tituloDicas}>Horizontais</Text>
            {horizontais.map((p, i) => (
              <Text key={i} style={styles.dica}>
                {p.numero}. {p.dica}
              </Text>
            ))}
          </View>
        )}
        {verticais.length > 0 && (
          <View style={styles.colunaDicas}>
            <Text style={styles.tituloDicas}>Verticais</Text>
            {verticais.map((p, i) => (
              <Text key={i} style={styles.dica}>
                {p.numero}. {p.dica}
              </Text>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}
