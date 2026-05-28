'use client';
import { useState, useCallback } from 'react';
import { pdf } from '@react-pdf/renderer';
import type { DocumentoPDF } from '../types/pdf.types';
import { PdfDocumento } from '../components/pdf/PdfDocument';
import { getTemplateConfig } from '../templates';

interface UseGerarPdfReturn {
  gerando: boolean;
  erro: string | null;
  gerarPdf: (documento: DocumentoPDF, nomeArquivo?: string) => Promise<void>;
}

export function useGerarPdf(): UseGerarPdfReturn {
  const [gerando, setGerando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const gerarPdf = useCallback(async (
    documento: DocumentoPDF,
    nomeArquivo = 'atividade-doceria-pedagogica'
  ) => {
    setGerando(true);
    setErro(null);

    try {
      const config = getTemplateConfig(documento.template);

      const blob = await pdf(
        <PdfDocumento documento={documento} config={config} />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${nomeArquivo}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Erro ao gerar PDF:', e);
      setErro('Não foi possível gerar o PDF. Tente novamente.');
    } finally {
      setGerando(false);
    }
  }, []);

  return { gerando, erro, gerarPdf };
}
