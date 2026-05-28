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

export function gerarCacaPalavras(opcoes: OpcoesCacaPalavras): BlocoCacaPalavras {
  const { palavras, tamanhoGrid = 15, permitirDiagonais = false } = opcoes;

  const palavrasLimpas = palavras
    .map(p => p.toUpperCase().replace(/\s/g, ''))
    .filter(p => p.length <= tamanhoGrid);

  const tamanho = Math.max(tamanhoGrid, ...palavrasLimpas.map(p => p.length));

  const grid: string[][] = Array.from({ length: tamanho }, () =>
    Array.from({ length: tamanho }, () => '')
  );

  const palavrasColocadas: string[] = [];

  for (const palavra of palavrasLimpas) {
    const colocada = tentarColocarPalavra(grid, palavra, tamanho, permitirDiagonais);
    if (colocada) palavrasColocadas.push(palavra);
  }

  const gridFinal: CelulaCacaPalavras[][] = grid.map(linha =>
    linha.map(letra => ({
      letra: letra || letraAleatoria(),
      destacada: false,
    }))
  );

  return {
    id: `caca-palavras-${Date.now()}`,
    tipo: 'caca-palavras',
    grid: gridFinal,
    palavras: palavrasColocadas,
  };
}

function tentarColocarPalavra(
  grid: string[][],
  palavra: string,
  tamanho: number,
  permitirDiagonais: boolean
): boolean {
  const direcoes = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
    ...(permitirDiagonais ? [[1, 1], [1, -1], [-1, 1], [-1, -1]] : []),
  ];

  for (let t = 0; t < 100; t++) {
    const dir = direcoes[Math.floor(Math.random() * direcoes.length)];
    const li = Math.floor(Math.random() * tamanho);
    const ci = Math.floor(Math.random() * tamanho);

    if (podeColocar(grid, palavra, li, ci, dir[0], dir[1], tamanho)) {
      colocarPalavra(grid, palavra, li, ci, dir[0], dir[1]);
      return true;
    }
  }

  return false;
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
