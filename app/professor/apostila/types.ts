export interface AtividadeData {
  numero: number;
  tipo: string;
  enunciado: string;
  tipo_resposta: 'linhas' | 'opcoes' | 'vf' | 'caixa' | 'cruzadinha';
  linhas?: number;
  opcoes?: string[] | null;
  itens_vf?: string[] | null;
  cruzadinha?: unknown;
}

export interface ApostilaData {
  titulo: string;
  subtitulo?: string;
  nivel: string;
  disciplina: string;
  introducao_titulo?: string;
  introducao_texto: string;
  destaque?: { titulo: string; texto: string } | null;
  mapa_mental?: { centro: string; ramos: string[] } | null;
  atividades: AtividadeData[];
  fechamento_titulo?: string;
  fechamento_texto: string;
  musica?: { tipo: string; letra: string } | null;
  orientacao_professor?: string;
  palavras_chave?: string[];
}
