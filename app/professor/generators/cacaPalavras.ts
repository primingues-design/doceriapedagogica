import type { BlocoCacaPalavras, CelulaCacaPalavras } from '../types/pdf.types';

const LETRAS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function letraAleatoria(): string {
  return LETRAS[Math.floor(Math.random() * LETRAS.length)];
}

export interface OpcoesCacaPalavras {
  palavras: string[];
  tamanhoGrid?: number;
  permitirDiagonais?: boolean;
}

export interface ResultadoCacaPalavras {
  bloco: BlocoCacaPalavras;
  gabarito: CelulaCacaPalavras[][];
}

export function gerarCacaPalavras(opcoes: OpcoesCacaPalavras): BlocoCacaPalavras {
  return gerarCacaPalavrasComGabarito(opcoes).bloco;
}

export function gerarCacaPalavrasComGabarito(opcoes: OpcoesCacaPalavras): ResultadoCacaPalavras {
  const { palavras, tamanhoGrid = 15, permitirDiagonais = false } = opcoes;

  const palavrasLimpas = palavras
    .map(p => p.toUpperCase().replace(/\s/g, ''))
    .filter(p => p.length <= tamanhoGrid);

  const tamanho = Math.max(tamanhoGrid, ...palavrasLimpas.map(p => p.length));

  const grid: string[][] = Array.from({ length: tamanho }, () =>
    Array.from({ length: tamanho }, () => '')
  );

  const palavrasColocadas: string[] = [];
  const celulasDePalavras = new Set<string>();

  for (const palavra of palavrasLimpas) {
    const pos = tentarColocarPalavraComRetorno(grid, palavra, tamanho, permitirDiagonais);
    if (pos) {
      palavrasColocadas.push(palavra);
      const { li, ci, dl, dc } = pos;
      for (let i = 0; i < palavra.length; i++) {
        celulasDePalavras.add(`${li + i * dl},${ci + i * dc}`);
      }
    }
  }

  const gridFinal: CelulaCacaPalavras[][] = grid.map((linha, r) =>
    linha.map((letra, c) => ({
      letra: letra || letraAleatoria(),
      destacada: false,
    }))
  );

  // Preenche letras aleatórias faltantes na grid interna
  for (let r = 0; r < tamanho; r++) {
    for (let c = 0; c < tamanho; c++) {
      if (!gridFinal[r][c].letra) gridFinal[r][c].letra = letraAleatoria();
    }
  }

  const gabarito: CelulaCacaPalavras[][] = gridFinal.map((linha, r) =>
    linha.map((celula, c) => ({
      letra: celula.letra,
      destacada: celulasDePalavras.has(`${r},${c}`),
    }))
  );

  return {
    bloco: {
      id: `caca-palavras-${Date.now()}`,
      tipo: 'caca-palavras',
      grid: gridFinal,
      palavras: palavrasColocadas,
    },
    gabarito,
  };
}

interface Posicao { li: number; ci: number; dl: number; dc: number; }

function tentarColocarPalavraComRetorno(
  grid: string[][],
  palavra: string,
  tamanho: number,
  permitirDiagonais: boolean
): Posicao | null {
  const direcoes = [
    [0, 1], [1, 0], [0, -1], [-1, 0],
    ...(permitirDiagonais ? [[1, 1], [1, -1], [-1, 1], [-1, -1]] : []),
  ];

  for (let t = 0; t < 100; t++) {
    const dir = direcoes[Math.floor(Math.random() * direcoes.length)];
    const li = Math.floor(Math.random() * tamanho);
    const ci = Math.floor(Math.random() * tamanho);

    if (podeColocar(grid, palavra, li, ci, dir[0], dir[1], tamanho)) {
      colocarPalavra(grid, palavra, li, ci, dir[0], dir[1]);
      return { li, ci, dl: dir[0], dc: dir[1] };
    }
  }

  return null;
}

function podeColocar(
  grid: string[][],
  palavra: string,
  li: number,
  ci: number,
  dl: number,
  dc: number,
  tamanho: number
): boolean {
  for (let i = 0; i < palavra.length; i++) {
    const nl = li + i * dl;
    const nc = ci + i * dc;
    if (nl < 0 || nl >= tamanho || nc < 0 || nc >= tamanho) return false;
    if (grid[nl][nc] !== '' && grid[nl][nc] !== palavra[i]) return false;
  }
  return true;
}

function colocarPalavra(
  grid: string[][],
  palavra: string,
  li: number,
  ci: number,
  dl: number,
  dc: number
): void {
  for (let i = 0; i < palavra.length; i++) {
    grid[li + i * dl][ci + i * dc] = palavra[i];
  }
}
