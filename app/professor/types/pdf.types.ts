export type TipoBloco =
  | 'titulo'
  | 'texto'
  | 'questao'
  | 'multipla-escolha'
  | 'caca-palavras'
  | 'cruzadinha'
  | 'gabarito'
  | 'assinatura'
  | 'observacoes'
  | 'rotina'
  | 'avaliacao';

export interface BlocoBase {
  id: string;
  tipo: TipoBloco;
}

export interface BlocoTitulo extends BlocoBase {
  tipo: 'titulo';
  texto: string;
  subtitulo?: string;
  disciplina?: string;
  serie?: string;
  data?: boolean;
  nome?: boolean;
}

export interface BlocoTexto extends BlocoBase {
  tipo: 'texto';
  conteudo: string;
}

export interface BlocoQuestao extends BlocoBase {
  tipo: 'questao';
  numero: number;
  enunciado: string;
  linhasResposta?: number;
  valor?: number;
}

export interface BlocoMultiplaEscolha extends BlocoBase {
  tipo: 'multipla-escolha';
  numero: number;
  enunciado: string;
  alternativas: string[];
  valor?: number;
}

export interface CelulaCacaPalavras {
  letra: string;
  destacada: boolean;
}

export interface BlocoCacaPalavras extends BlocoBase {
  tipo: 'caca-palavras';
  titulo?: string;
  grid: CelulaCacaPalavras[][];
  palavras: string[];
  tamanhoFonte?: number;
}

export interface PalavraCruzadinha {
  palavra: string;
  dica: string;
  direcao: 'horizontal' | 'vertical';
  linha: number;
  coluna: number;
  numero: number;
}

export interface BlocoCruzadinha extends BlocoBase {
  tipo: 'cruzadinha';
  titulo?: string;
  grid: (string | null)[][];
  palavras: PalavraCruzadinha[];
}

export interface BlocoGabarito extends BlocoBase {
  tipo: 'gabarito';
  respostas: { numero: number; resposta: string }[];
}

export interface BlocoAssinatura extends BlocoBase {
  tipo: 'assinatura';
  campos: ('professor' | 'aluno' | 'responsavel' | 'data' | 'nota')[];
}

export interface BlocoObservacoes extends BlocoBase {
  tipo: 'observacoes';
  linhas?: number;
}

export type Bloco =
  | BlocoTitulo
  | BlocoTexto
  | BlocoQuestao
  | BlocoMultiplaEscolha
  | BlocoCacaPalavras
  | BlocoCruzadinha
  | BlocoGabarito
  | BlocoAssinatura
  | BlocoObservacoes;

export interface DocumentoPDF {
  blocos: Bloco[];
  template: NomeTemplate;
}

export type NomeTemplate =
  | 'infantilLudico'
  | 'fundamental1'
  | 'fundamental2'
  | 'ejaAdulto'
  | 'neurodivergente';
