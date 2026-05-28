import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import type { BlocoTexto } from '../../../types/pdf.types';
import type { TemplateConfig } from '../../../templates/types/template.types';

interface Props {
  bloco: BlocoTexto;
  config: TemplateConfig;
}

export function PdfTexto({ bloco, config }: Props) {
  const styles = StyleSheet.create({
    container: {
      marginBottom: config.espacamento.entreBlocos,
    },
    texto: {
      fontSize: config.tipografia.tamanhoCorpo,
      fontFamily: config.tipografia.fonteCorpo,
      color: config.cores.texto,
      lineHeight: config.tipografia.alturaDeLinha,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>{bloco.conteudo}</Text>
    </View>
  );
}
