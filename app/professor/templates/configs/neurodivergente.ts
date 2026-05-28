import type { TemplateConfig } from '../types/template.types';

export const neurodivergentConfig: TemplateConfig = {
  nome: 'Neurodivergente',
  descricao: 'Baixa poluição visual, alto contraste e hierarquia clara',
  pagina: {
    tamanho: 'A4',
    orientacao: 'portrait',
    margemSuperior: 50,
    margemInferior: 50,
    margemEsquerda: 60,
    margemDireita: 60,
  },
  tipografia: {
    fonteTitulo: 'Helvetica-Bold',
    fonteCorpo: 'Helvetica',
    tamanhoTitulo: 18,
    tamanhoSubtitulo: 15,
    tamanhoCorpo: 14,
    tamanhoQuestao: 14,
    alturaDeLinha: 2.2,
  },
  cores: {
    primaria: '#000000',
    secundaria: '#333333',
    fundo: '#ffffff',
    texto: '#000000',
    bordas: '#000000',
    destaque: '#f0f0f0',
  },
  espacamento: {
    entreQuestoes: 30,
    entreBlocos: 24,
    padding: 14,
    linhasResposta: 44,
  },
  elementosVisuais: {
    mostrarIlustracoes: false,
    bordaDecorada: false,
    cabecalhoSimples: true,
    numeracaoPaginas: true,
  },
};
