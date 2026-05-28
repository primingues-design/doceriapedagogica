import type { TemplateConfig } from '../types/template.types';

export const ejaAdultoConfig: TemplateConfig = {
  nome: 'EJA / Adulto',
  descricao: 'Visual limpo e sofisticado para adultos em processo de alfabetização',
  pagina: {
    tamanho: 'A4',
    orientacao: 'portrait',
    margemSuperior: 40,
    margemInferior: 40,
    margemEsquerda: 50,
    margemDireita: 50,
  },
  tipografia: {
    fonteTitulo: 'Helvetica-Bold',
    fonteCorpo: 'Helvetica',
    tamanhoTitulo: 20,
    tamanhoSubtitulo: 16,
    tamanhoCorpo: 14,
    tamanhoQuestao: 14,
    alturaDeLinha: 1.8,
  },
  cores: {
    primaria: '#1a1a2e',
    secundaria: '#16213e',
    fundo: '#ffffff',
    texto: '#000000',
    bordas: '#333333',
    destaque: '#0f3460',
  },
  espacamento: {
    entreQuestoes: 20,
    entreBlocos: 16,
    padding: 10,
    linhasResposta: 36,
  },
  elementosVisuais: {
    mostrarIlustracoes: false,
    bordaDecorada: false,
    cabecalhoSimples: true,
    numeracaoPaginas: true,
  },
};
