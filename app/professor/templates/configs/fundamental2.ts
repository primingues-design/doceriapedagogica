import type { TemplateConfig } from '../types/template.types';

export const fundamental2Config: TemplateConfig = {
  nome: 'Fundamental 2',
  descricao: 'Visual objetivo e profissional para o 6º ao 9º ano',
  pagina: {
    tamanho: 'A4',
    orientacao: 'portrait',
    margemSuperior: 38,
    margemInferior: 38,
    margemEsquerda: 50,
    margemDireita: 50,
  },
  tipografia: {
    fonteTitulo: 'Helvetica-Bold',
    fonteCorpo: 'Helvetica',
    tamanhoTitulo: 18,
    tamanhoSubtitulo: 14,
    tamanhoCorpo: 12,
    tamanhoQuestao: 12,
    alturaDeLinha: 1.6,
  },
  cores: {
    primaria: '#1a3a6b',
    secundaria: '#2c5282',
    fundo: '#ffffff',
    texto: '#000000',
    bordas: '#2c5282',
    destaque: '#ebf4ff',
  },
  espacamento: {
    entreQuestoes: 18,
    entreBlocos: 14,
    padding: 10,
    linhasResposta: 30,
  },
  elementosVisuais: {
    mostrarIlustracoes: false,
    bordaDecorada: false,
    cabecalhoSimples: true,
    numeracaoPaginas: true,
  },
};
