export interface PalavraEntrada {
  texto: string;
  dica: string;
  emoji?: string;
}

export interface PosicaoPalavra {
  texto: string;
  dica: string;
  emoji: string;
  r: number;
  c: number;
  direcao: 'H' | 'V';
  numero: number;
}

export interface ResultadoCruzadinha {
  gridData: (string | null)[][];
  placements: PosicaoPalavra[];
  colunas: number;
  linhas: number;
}

export function gerarCruzadinha(palavras: PalavraEntrada[]): ResultadoCruzadinha {
  const sorted = [...palavras]
    .sort((a, b) => b.texto.length - a.texto.length)
    .slice(0, 14);

  const SIZE = 21;
  const grid: (string | null)[][] = Array.from({ length: SIZE }, () => Array(SIZE).fill(null));
  const placements: PosicaoPalavra[] = [];
  let num = 1;

  // Coloca a primeira palavra horizontalmente no centro
  const first = sorted[0];
  const sc = Math.floor((SIZE - first.texto.length) / 2);
  const sr = Math.floor(SIZE / 2);
  for (let i = 0; i < first.texto.length; i++) grid[sr][sc + i] = first.texto[i];
  placements.push({ texto: first.texto, dica: first.dica, emoji: first.emoji || '', r: sr, c: sc, direcao: 'H', numero: num++ });

  // Tenta encaixar as demais palavras
  for (let wi = 1; wi < sorted.length; wi++) {
    const { texto: word, dica, emoji } = sorted[wi];
    let best: PosicaoPalavra | null = null;
    let bestScore = -1;

    for (const pl of placements) {
      for (let pi = 0; pi < pl.texto.length; pi++) {
        for (let wii = 0; wii < word.length; wii++) {
          if (pl.texto[pi] !== word[wii]) continue;
          const newDir: 'H' | 'V' = pl.direcao === 'H' ? 'V' : 'H';
          let r: number, c: number;
          if (newDir === 'V') { r = pl.r - wii; c = pl.c + pi; }
          else { r = pl.r + pi; c = pl.c - wii; }

          if (r < 1 || c < 1) continue;
          if (newDir === 'V' && r + word.length >= SIZE - 1) continue;
          if (newDir === 'H' && c + word.length >= SIZE - 1) continue;

          let fits = true; let cross = 0;
          for (let li = 0; li < word.length; li++) {
            const lr = newDir === 'V' ? r + li : r;
            const lc = newDir === 'H' ? c + li : c;
            const ex = grid[lr]?.[lc];
            if (ex !== null && ex !== word[li]) { fits = false; break; }
            if (ex === word[li]) cross++;
            if (ex === null) {
              if (newDir === 'H') {
                if (li > 0 && (grid[lr - 1]?.[lc] != null || grid[lr + 1]?.[lc] != null)) { fits = false; break; }
              } else {
                if (li > 0 && (grid[lr]?.[lc - 1] != null || grid[lr]?.[lc + 1] != null)) { fits = false; break; }
              }
            }
          }
          if (fits) {
            if (newDir === 'H' && (grid[r]?.[c - 1] != null || grid[r]?.[c + word.length] != null)) fits = false;
            if (newDir === 'V' && (grid[r - 1]?.[c] != null || grid[r + word.length]?.[c] != null)) fits = false;
          }
          if (fits && cross > bestScore) {
            bestScore = cross;
            best = { texto: word, dica, emoji: emoji || '', r, c, direcao: newDir, numero: num };
          }
        }
      }
    }
    if (best) {
      const { texto: w, r, c, direcao } = best;
      for (let li = 0; li < w.length; li++) {
        grid[direcao === 'V' ? r + li : r][direcao === 'H' ? c + li : c] = w[li];
      }
      placements.push(best);
      num++;
    }
  }

  // Corta ao bounding box
  let mnR = SIZE, mxR = 0, mnC = SIZE, mxC = 0;
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (grid[r][c] != null) {
        mnR = Math.min(mnR, r); mxR = Math.max(mxR, r);
        mnC = Math.min(mnC, c); mxC = Math.max(mxC, c);
      }
    }
  }
  mnR = Math.max(0, mnR - 1); mxR = Math.min(SIZE - 1, mxR + 1);
  mnC = Math.max(0, mnC - 1); mxC = Math.min(SIZE - 1, mxC + 1);

  const gridTrimmed: (string | null)[][] = [];
  for (let r = mnR; r <= mxR; r++) {
    const row: (string | null)[] = [];
    for (let c = mnC; c <= mxC; c++) row.push(grid[r][c]);
    gridTrimmed.push(row);
  }

  const adjustedPlacements = placements.map(pl => ({
    ...pl,
    r: pl.r - mnR,
    c: pl.c - mnC,
  }));

  return {
    gridData: gridTrimmed,
    placements: adjustedPlacements,
    colunas: mxC - mnC + 1,
    linhas: mxR - mnR + 1,
  };
}
