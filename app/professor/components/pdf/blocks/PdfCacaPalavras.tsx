import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import type { BlocoCacaPalavras } from '../../../types/pdf.types';
import type { TemplateConfig } from '../../../templates/types/template.types';

interface Props {
  bloco: BlocoCacaPalavras;
  config: TemplateConfig;
}

export function PdfCacaPalavras({ bloco, config }: Props) {
  const tamanhoFonte = bloco.tamanhoFonte || config.tipografia.tamanhoCorpo;
  const tamanhoCelula = tamanhoFonte * 2.2;

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
    grid: {
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: 12,
    },
    linha: {
      flexDirection: 'row',
    },
    celula: {
      width: tamanhoCelula,
      height: tamanhoCelula,
      borderWidth: 1,
      borderColor: config.cores.bordas,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff',
    },
    celulaDestacada: {
      backgroundColor: config.cores.destaque,
    },
    letra: {
      fontSize: tamanhoFonte,
      fontFamily: config.tipografia.fonteTitulo,
      color: config.cores.texto,
      textAlign: 'center',
    },
    listaPalavras: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginTop: 8,
    },
    palavra: {
      fontSize: config.tipografia.tamanhoCorpo - 1,
      fontFamily: config.tipografia.fonteTitulo,
      color: config.cores.primaria,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderWidth: 1,
      borderColor: config.cores.bordas,
      borderRadius: 3,
    },
    tituloPalavras: {
      fontSize: config.tipografia.tamanhoCorpo,
      fontFamily: config.tipografia.fonteTitulo,
      color: config.cores.secundaria,
      marginBottom: 6,
    },
  });

  return (
    <View style={styles.container} wrap={false}>
      {bloco.titulo && (
        <Text style={styles.titulo}>{bloco.titulo}</Text>
      )}
      <View style={styles.grid}>
        {bloco.grid.map((linha, li) => (
          <View key={li} style={styles.linha}>
            {linha.map((celula, ci) => (
              <View
                key={ci}
                style={[
                  styles.celula,
                  celula.destacada ? styles.celulaDestacada : {},
                ]}
              >
                <Text style={styles.letra}>{celula.letra.toUpperCase()}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
      <Text style={styles.tituloPalavras}>Encontre as palavras:</Text>
      <View style={styles.listaPalavras}>
        {bloco.palavras.map((palavra, i) => (
          <Text key={i} style={styles.palavra}>
            {palavra.toUpperCase()}
          </Text>
        ))}
      </View>
    </View>
  );
}
