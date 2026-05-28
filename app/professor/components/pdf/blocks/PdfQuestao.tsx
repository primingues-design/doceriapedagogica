import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import type { BlocoQuestao } from '../../../types/pdf.types';
import type { TemplateConfig } from '../../../templates/types/template.types';

interface Props {
  bloco: BlocoQuestao;
  config: TemplateConfig;
}

export function PdfQuestao({ bloco, config }: Props) {
  const linhas = bloco.linhasResposta || 3;

  const styles = StyleSheet.create({
    container: {
      marginBottom: config.espacamento.entreQuestoes,
    },
    cabecalho: {
      flexDirection: 'row',
      alignItems: 'flex-start',
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
    areaResposta: {
      marginTop: 8,
      marginLeft: 24,
    },
    linhaResposta: {
      borderBottomWidth: 1,
      borderBottomColor: config.cores.bordas,
      marginBottom: config.espacamento.linhasResposta,
      width: '100%',
    },
    valor: {
      fontSize: 10,
      color: config.cores.secundaria,
      textAlign: 'right',
      marginBottom: 4,
    },
  });

  return (
    <View style={styles.container}>
      {bloco.valor && (
        <Text style={styles.valor}>({bloco.valor} pts)</Text>
      )}
      <View style={styles.cabecalho}>
        <Text style={styles.numero}>{bloco.numero}.</Text>
        <Text style={styles.enunciado}>{bloco.enunciado}</Text>
      </View>
      <View style={styles.areaResposta}>
        {Array.from({ length: linhas }).map((_, i) => (
          <View key={i} style={styles.linhaResposta} />
        ))}
      </View>
    </View>
  );
}
