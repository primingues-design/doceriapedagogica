export interface TemplateConfig {
  nome: string;
  descricao: string;
  pagina: {
    tamanho: 'A4' | 'A3';
    orientacao: 'portrait' | 'landscape';
    margemSuperior: number;
    margemInferior: number;
    margemEsquerda: number;
    margemDireita: number;
  };
  tipografia: {
    fonteTitulo: string;
    fonteCorpo: string;
    tamanhoTitulo: number;
    tamanhoSubtitulo: number;
    tamanhoCorpo: number;
    tamanhoQuestao: number;
    alturaDeLinha: number;
  };
  cores: {
    primaria: string;
    secundaria: string;
    fundo: string;
    texto: string;
    bordas: string;
    destaque: string;
  };
  espacamento: {
    entreQuestoes: number;
    entreBlocos: number;
    padding: number;
    linhasResposta: number;
  };
  elementosVisuais: {
    mostrarIlustracoes: boolean;
    bordaDecorada: boolean;
    cabecalhoSimples: boolean;
    numeracaoPaginas: boolean;
  };
}
