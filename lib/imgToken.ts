// Autorização de imagens: cada geração paga em /api/claude recebe um token assinado que libera
// a IA de imagem (/api/imagem) por pouco tempo e com teto de chamadas. Sem gerar (e pagar), sem imagem.
import { createHmac, randomBytes, timingSafeEqual } from 'crypto';

const SEGREDO = () => process.env.IMG_TOKEN_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const VALIDADE_MS = 20 * 60 * 1000; // 20 minutos depois da geração
const TETO = 40;                     // chamadas por token (as páginas pedem no máximo ~19, com nova tentativa)

const assinar = (dados: string) => createHmac('sha256', SEGREDO()).update(dados).digest('base64url');

export function criarTokenImagem(userId: string): string | null {
  if (!SEGREDO()) return null;
  const dados = `${userId}.${Date.now()}.${randomBytes(6).toString('base64url')}`;
  return `${dados}.${assinar(dados)}`;
}

// Contagem por token (melhor esforço: por instância do servidor; o prazo curto limita o resto).
const usos = new Map<string, number>();

export function usarTokenImagem(token: string, userId: string): boolean {
  if (!token || !SEGREDO()) return false;
  const partes = token.split('.');
  if (partes.length !== 4) return false;
  const [uid, quando, nonce, sig] = partes;
  const esperada = Buffer.from(assinar(`${uid}.${quando}.${nonce}`));
  const recebida = Buffer.from(sig);
  if (esperada.length !== recebida.length || !timingSafeEqual(esperada, recebida)) return false;
  if (uid !== userId) return false;
  const idade = Date.now() - Number(quando);
  if (!(idade >= 0 && idade < VALIDADE_MS)) return false;
  const n = (usos.get(nonce) || 0) + 1;
  if (n > TETO) return false;
  usos.set(nonce, n);
  if (usos.size > 5000) usos.clear(); // não deixa o mapa crescer sem limite
  return true;
}
