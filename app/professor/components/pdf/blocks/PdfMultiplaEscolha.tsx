import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import type { BlocoMultiplaEscolha } from '../../../types/pdf.types';
import type { TemplateConfig } from '../../../templates/types/template.types';

interface Props {
  bloco: BlocoMultiplaEscolha;
  config: TemplateConfig;
}

export function PdfMultiplaEscolha({ bloco, config }: Props) {
  const letras = ['a', 'b', 'c', 'd', 'e'];

  const styles = StyleSheet.create({
    container: {
      marginBottom: config.espacamento.entreQuestoes,
    },
    cabecalho: {
      flexDirection: 'row',
      marginBottom: 8,
    },
    numero: {
      fontSize: config.tipografia.tamanhoQuestao,
      fontFamily: config.tipografia.fonteTitulo,
      color: config.cores.primaria,
      marginRight: 8,
      minWidth: 24,
    },
    enunciado: {
      fontSize: config.tipografia.tamanhoQuestao,
      fontFamily: config.tipografia.fonteCorpo,
      color: config.cores.texto,
      lineHeight: config.tipografia.alturaDeLinha,
      flex: 1,
    },
    alternativas: {
      marginLeft: 24,
    },
    alternativa: {
      flexDirection: 'row',
      marginBottom: 8,
      alignItems: 'flex-start',
    },
    circulo: {
      width: 18,
      height: 18,
      borderRadius: 9,
      borderWidth: 1.5,
      borderColor: config.cores.bordas,
      marginRight: 8,
      marginTop: 1,
    },
    letraAlternativa: {
      fontSize: config.tipografia.tamanhoQuestao,
      fontFamily: config.tipografia.fonteTitulo,
      color: config.cores.primaria,
      marginRight: 6,
    },
    textoAlternativa: {
      fontSize: config.tipografia.tamanhoQuestao,
      fontFamily: config.tipografia.fonteCorpo,
      color: config.cores.texto,
      lineHeight: config.tipografia.alturaDeLinha,
      flex: 1,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <Text style={styles.numero}>{bloco.numero}.</Text>
        <Text style={styles.enunciado}>{bloco.enunciado}</Text>
      </View>
      <View style={styles.alternativas}>
        {bloco.alternativas.map((alt, i) => (
          <View key={i} style={styles.alternativa}>
            <View style={styles.circulo} />
            <Text style={styles.letraAlternativa}>{letras[i]})</Text>
            <Text style={styles.textoAlternativa}>{alt}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
