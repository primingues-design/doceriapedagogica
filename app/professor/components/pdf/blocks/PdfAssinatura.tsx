import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import type { BlocoAssinatura } from '../../../types/pdf.types';
import type { TemplateConfig } from '../../../templates/types/template.types';

interface Props {
  bloco: BlocoAssinatura;
  config: TemplateConfig;
}

const LABELS: Record<string, string> = {
  professor: 'Professor(a)',
  aluno: 'Aluno(a)',
  responsavel: 'Responsável',
  data: 'Data',
  nota: 'Nota',
};

export function PdfAssinatura({ bloco, config }: Props) {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: config.cores.bordas,
    },
    campo: {
      flex: 1,
      alignItems: 'center',
      marginHorizontal: 8,
    },
    linha: {
      width: '80%',
      borderBottomWidth: 1,
      borderBottomColor: config.cores.bordas,
      marginBottom: 6,
    },
    label: {
      fontSize: 10,
      fontFamily: config.tipografia.fonteCorpo,
      color: config.cores.secundaria,
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.container}>
      {bloco.campos.map((campo, i) => (
        <View key={i} style={styles.campo}>
          <View style={styles.linha} />
          <Text style={styles.label}>{LABELS[campo]}</Text>
        </View>
      ))}
    </View>
  );
}
