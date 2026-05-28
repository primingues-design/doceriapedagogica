import type { TemplateConfig } from '../types/template.types';

export const infantilLudicoConfig: TemplateConfig = {
  nome: 'Infantil Lúdico',
  descricao: 'Visual amigável para alfabetização e educação infantil',
  pagina: {
    tamanho: 'A4',
    orientacao: 'portrait',
    margemSuperior: 35,
    margemInferior: 35,
    margemEsquerda: 45,
    margemDireita: 45,
  },
  tipografia: {
    fonteTitulo: 'Helvetica-Bold',
    fonteCorpo: 'Helvetica',
    tamanhoTitulo: 22,
    tamanhoSubtitulo: 18,
    tamanhoCorpo: 16,
    tamanhoQuestao: 16,
    alturaDeLinha: 2.0,
  },
  cores: {
    primaria: '#6c3483',
    secundaria: '#8e44ad',
    fundo: '#ffffff',
    texto: '#000000',
    bordas: '#6c3483',
    destaque: '#d7bde2',
  },
  espacamento: {
    entreQuestoes: 24,
    entreBlocos: 20,
    padding: 12,
    linhasResposta: 40,
  },
  elementosVisuais: {
    mostrarIlustracoes: true,
    bordaDecorada: true,
    cabecalhoSimples: false,
    numeracaoPaginas: true,
  },
};
