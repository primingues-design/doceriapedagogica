import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import type { BlocoObservacoes } from '../../../types/pdf.types';
import type { TemplateConfig } from '../../../templates/types/template.types';

interface Props {
  bloco: BlocoObservacoes;
  config: TemplateConfig;
}

export function PdfObservacoes({ bloco, config }: Props) {
  const linhas = bloco.linhas || 4;

  const styles = StyleSheet.create({
    container: {
      marginTop: 16,
      padding: 10,
      borderWidth: 1,
      borderColor: config.cores.bordas,
      borderRadius: 4,
    },
    titulo: {
      fontSize: 11,
      fontFamily: config.tipografia.fonteTitulo,
      color: config.cores.secundaria,
      marginBottom: 8,
    },
    linha: {
      borderBottomWidth: 0.5,
      borderBottomColor: config.cores.bordas,
      marginBottom: config.espacamento.linhasResposta,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Observações do professor(a):</Text>
      {Array.from({ length: linhas }).map((_, i) => (
        <View key={i} style={styles.linha} />
      ))}
    </View>
  );
}
