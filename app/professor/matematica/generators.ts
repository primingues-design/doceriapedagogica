export type OpKey = 'adicao' | 'subtracao' | 'multiplicacao' | 'divisao';
export type Dificuldade = 'facil' | 'medio' | 'dificil';

export interface Problema {
  num1: number;
  num2: number;
  res: number;
  resto?: number;
  sign: string;
  opKey: OpKey;
  label: string;
}

function rand(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function genAdicao(dif: Dificuldade): Problema {
  let num1: number, num2: number;
  if (dif === 'facil') {
    do { num1 = rand(1, 18); num2 = rand(1, 18); }
    while ((num1 % 10) + (num2 % 10) >= 10 || num1 + num2 > 25);
  } else if (dif === 'medio') {
    do { num1 = rand(12, 89); num2 = rand(12, 89); }
    while ((num1 % 10) + (num2 % 10) < 10);
  } else {
    num1 = rand(101, 999); num2 = rand(101, 999);
  }
  return { num1, num2, res: num1 + num2, sign: '+', opKey: 'adicao', label: 'Adição' };
}

function genSubtracao(dif: Dificuldade): Problema {
  let num1: number, num2: number;
  if (dif === 'facil') {
    do { num1 = rand(5, 25); num2 = rand(1, num1 - 1); }
    while ((num1 % 10) < (num2 % 10) || num2 === 0);
  } else if (dif === 'medio') {
    do { num1 = rand(21, 99); num2 = rand(10, num1 - 5); }
    while ((num1 % 10) >= (num2 % 10));
  } else {
    do { num1 = rand(201, 999); num2 = rand(100, num1 - 10); }
    while ((num1 % 10) >= (num2 % 10) || (Math.floor(num1 / 10) % 10) >= (Math.floor(num2 / 10) % 10));
  }
  return { num1, num2, res: num1 - num2, sign: '−', opKey: 'subtracao', label: 'Subtração' };
}

function genMultiplicacao(dif: Dificuldade): Problema {
  let num1: number, num2: number;
  if (dif === 'facil') {
    num1 = rand(2, 10); num2 = rand(2, 10);
  } else if (dif === 'medio') {
    do { num1 = rand(12, 99); num2 = rand(3, 9); }
    while (num1 * num2 < 20);
  } else {
    num1 = rand(12, 199); num2 = rand(11, 25);
  }
  return { num1, num2, res: num1 * num2, sign: '×', opKey: 'multiplicacao', label: 'Multiplicação' };
}

function genDivisao(dif: Dificuldade): Problema {
  let num1: number, num2: number, res: number, resto: number;
  if (dif === 'facil') {
    num2 = rand(2, 10); res = rand(2, 10);
    num1 = num2 * res; resto = 0;
  } else if (dif === 'medio') {
    num2 = rand(3, 12); res = rand(11, 30);
    num1 = num2 * res; resto = 0;
  } else {
    num2 = rand(11, 20); res = rand(10, 40); resto = rand(1, num2 - 1);
    num1 = num2 * res + resto;
  }
  return { num1, num2, res, resto, sign: '÷', opKey: 'divisao', label: 'Divisão' };
}

const OP_FNS: Record<OpKey, (d: Dificuldade) => Problema> = {
  adicao: genAdicao,
  subtracao: genSubtracao,
  multiplicacao: genMultiplicacao,
  divisao: genDivisao,
};

const MIXED_OPS: OpKey[] = ['adicao', 'subtracao', 'multiplicacao', 'divisao'];

export function gerarProblemas(op: OpKey | 'mista', dif: Dificuldade, qty: number): Problema[] {
  return Array.from({ length: qty }, (_, i) => {
    const key: OpKey = op === 'mista' ? MIXED_OPS[i % 4] : op;
    return OP_FNS[key](dif);
  });
}

export function opLabel(op: OpKey | 'mista'): string {
  if (op === 'mista') return 'Operações Mistas';
  return { adicao: 'Adição', subtracao: 'Subtração', multiplicacao: 'Multiplicação', divisao: 'Divisão' }[op];
}
