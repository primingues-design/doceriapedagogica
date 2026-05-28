import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import type { BlocoTitulo } from '../../../types/pdf.types';
import type { TemplateConfig } from '../../../templates/types/template.types';

interface Props {
  bloco: BlocoTitulo;
  config: TemplateConfig;
}

export function PdfTitulo({ bloco, config }: Props) {
  const styles = StyleSheet.create({
    container: {
      marginBottom: config.espacamento.entreBlocos + 4,
      borderBottomWidth: 2,
      borderBottomColor: config.cores.primaria,
      paddingBottom: 10,
    },
    titulo: {
      fontSize: config.tipografia.tamanhoTitulo,
      fontFamily: config.tipografia.fonteTitulo,
      color: config.cores.primaria,
      textAlign: 'center',
      marginBottom: 4,
    },
    subtitulo: {
      fontSize: config.tipografia.tamanhoSubtitulo,
      fontFamily: config.tipografia.fonteCorpo,
      color: config.cores.secundaria,
      textAlign: 'center',
      marginBottom: 10,
    },
    metadados: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 12,
    },
    campo: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      marginRight: 12,
    },
    labelCampo: {
      fontSize: 11,
      fontFamily: config.tipografia.fonteTitulo,
      color: config.cores.texto,
      marginRight: 4,
    },
    linhaCampo: {
      flex: 1,
      borderBottomWidth: 1,
      borderBottomColor: config.cores.bordas,
      height: 18,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{bloco.texto}</Text>
      {bloco.subtitulo && (
        <Text style={styles.subtitulo}>{bloco.subtitulo}</Text>
      )}
      <View style={styles.metadados}>
        {bloco.nome && (
          <View style={styles.campo}>
            <Text style={styles.labelCampo}>Nome:</Text>
            <View style={styles.linhaCampo} />
          </View>
        )}
        {bloco.serie && (
          <View style={[styles.campo, { flex: 0.4 }]}>
            <Text style={styles.labelCampo}>Série:</Text>
            <View style={styles.linhaCampo} />
          </View>
        )}
        {bloco.data && (
          <View style={[styles.campo, { flex: 0.5 }]}>
            <Text style={styles.labelCampo}>Data:</Text>
            <View style={styles.linhaCampo} />
          </View>
        )}
      </View>
    </View>
  );
}
