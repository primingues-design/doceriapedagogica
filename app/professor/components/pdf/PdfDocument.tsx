import React from 'react';
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import type { DocumentoPDF } from '../../types/pdf.types';
import type { TemplateConfig } from '../../templates/types/template.types';
import { PdfTitulo } from './blocks/PdfTitulo';
import { PdfTexto } from './blocks/PdfTexto';
import { PdfQuestao } from './blocks/PdfQuestao';
import { PdfMultiplaEscolha } from './blocks/PdfMultiplaEscolha';
import { PdfCacaPalavras } from './blocks/PdfCacaPalavras';
import { PdfCruzadinha } from './blocks/PdfCruzadinha';
import { PdfGabarito } from './blocks/PdfGabarito';
import { PdfAssinatura } from './blocks/PdfAssinatura';
import { PdfObservacoes } from './blocks/PdfObservacoes';

interface Props {
  documento: DocumentoPDF;
  config: TemplateConfig;
}

export function PdfDocumento({ documento, config }: Props) {
  const styles = StyleSheet.create({
    pagina: {
      backgroundColor: '#ffffff',
      paddingTop: config.pagina.margemSuperior,
      paddingBottom: config.pagina.margemInferior,
      paddingLeft: config.pagina.margemEsquerda,
      paddingRight: config.pagina.margemDireita,
      fontFamily: config.tipografia.fonteCorpo,
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
      paddingTop: 6,
    },
    rodapeTexto: {
      fontSize: 9,
      color: '#888888',
    },
  });

  const renderBloco = (bloco: DocumentoPDF['blocos'][number]) => {
    switch (bloco.tipo) {
      case 'titulo':
        return <PdfTitulo key={bloco.id} bloco={bloco} config={config} />;
      case 'texto':
        return <PdfTexto key={bloco.id} bloco={bloco} config={config} />;
      case 'questao':
        return <PdfQuestao key={bloco.id} bloco={bloco} config={config} />;
      case 'multipla-escolha':
        return <PdfMultiplaEscolha key={bloco.id} bloco={bloco} config={config} />;
      case 'caca-palavras':
        return <PdfCacaPalavras key={bloco.id} bloco={bloco} config={config} />;
      case 'cruzadinha':
        return <PdfCruzadinha key={bloco.id} bloco={bloco} config={config} />;
      case 'gabarito':
        return <PdfGabarito key={bloco.id} bloco={bloco} config={config} />;
      case 'assinatura':
        return <PdfAssinatura key={bloco.id} bloco={bloco} config={config} />;
      case 'observacoes':
        return <PdfObservacoes key={bloco.id} bloco={bloco} config={config} />;
      default:
        return null;
    }
  };

  return (
    <Document>
      <Page
        size="A4"
        orientation={config.pagina.orientacao}
        style={styles.pagina}
      >
        {documento.blocos.map(renderBloco)}

        {config.elementosVisuais.numeracaoPaginas && (
          <View style={styles.rodape} fixed>
            <Text style={styles.rodapeTexto}>Doceria Pedagógica</Text>
            <Text
              style={styles.rodapeTexto}
              render={({ pageNumber, totalPages }) =>
                `${pageNumber} / ${totalPages}`
              }
            />
          </View>
        )}
      </Page>
    </Document>
  );
}
