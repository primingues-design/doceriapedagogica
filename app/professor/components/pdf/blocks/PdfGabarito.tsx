import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import type { BlocoGabarito } from '../../../types/pdf.types';
import type { TemplateConfig } from '../../../templates/types/template.types';

interface Props {
  bloco: BlocoGabarito;
  config: TemplateConfig;
}

export function PdfGabarito({ bloco, config }: Props) {
  const styles = StyleSheet.create({
    container: {
      marginTop: 20,
      padding: 12,
      backgroundColor: '#f5f5f5',
      borderRadius: 4,
      borderTopWidth: 2,
      borderTopColor: config.cores.primaria,
    },
    titulo: {
      fontSize: config.tipografia.tamanhoSubtitulo,
      fontFamily: config.tipografia.fonteTitulo,
      color: config.cores.primaria,
      marginBottom: 10,
      textAlign: 'center',
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    item: {
      flexDirection: 'row',
      minWidth: 80,
    },
    numero: {
      fontSize: 12,
      fontFamily: config.tipografia.fonteTitulo,
      color: config.cores.secundaria,
      marginRight: 4,
    },
    resposta: {
      fontSize: 12,
      fontFamily: config.tipografia.fonteCorpo,
      color: config.cores.texto,
    },
  });

  return (
    <View style={styles.container} break>
      <Text style={styles.titulo}>GABARITO</Text>
      <View style={styles.grid}>
        {bloco.respostas.map((r, i) => (
          <View key={i} style={styles.item}>
            <Text style={styles.numero}>{r.numero}.</Text>
            <Text style={styles.resposta}>{r.resposta}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
