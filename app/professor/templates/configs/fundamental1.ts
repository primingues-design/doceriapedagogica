import type { TemplateConfig } from '../types/template.types';

export const fundamental1Config: TemplateConfig = {
  nome: 'Fundamental 1',
  descricao: 'Visual organizado e acolhedor para o 1º ao 5º ano',
  pagina: {
    tamanho: 'A4',
    orientacao: 'portrait',
    margemSuperior: 36,
    margemInferior: 36,
    margemEsquerda: 48,
    margemDireita: 48,
  },
  tipografia: {
    fonteTitulo: 'Helvetica-Bold',
    fonteCorpo: 'Helvetica',
    tamanhoTitulo: 20,
    tamanhoSubtitulo: 16,
    tamanhoCorpo: 13,
    tamanhoQuestao: 13,
    alturaDeLinha: 1.8,
  },
  cores: {
    primaria: '#1a6b3a',
    secundaria: '#2e8b57',
    fundo: '#ffffff',
    texto: '#000000',
    bordas: '#2e8b57',
    destaque: '#c8f0da',
  },
  espacamento: {
    entreQuestoes: 20,
    entreBlocos: 16,
    padding: 10,
    linhasResposta: 34,
  },
  elementosVisuais: {
    mostrarIlustracoes: true,
    bordaDecorada: false,
    cabecalhoSimples: false,
    numeracaoPaginas: true,
  },
};
