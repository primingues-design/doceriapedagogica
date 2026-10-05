// Confere com o Supabase se o token de login é VERDADEIRO antes de confiar no id/e-mail.
// (Só decodificar o JWT não basta: qualquer um monta um token falso com o e-mail que quiser.)
// O endpoint /auth/v1/user valida a assinatura e a validade do token e devolve o usuário real.

const SUPA_URL = process.env.SUPABASE_URL || 'https://atkwvwhwbkerezdmipxw.supabase.co';
// Chave pública (publishable) como reserva — é a mesma que o site já usa no navegador.
const SUPA_APIKEY = () =>
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'sb_publishable_zWPrTWOrbMSCnD1uwOWulg_borGCRbZ';

export type VerifiedUser = { id: string; email: string };

export function tokenFrom(authHeader: string | null): string {
  return (authHeader || '').replace(/^Bearer\s+/i, '').trim();
}

export async function verifyUser(token: string): Promise<VerifiedUser | null> {
  if (!token || token.split('.').length !== 3) return null;
  try {
    const r = await fetch(`${SUPA_URL}/auth/v1/user`, {
      headers: { apikey: SUPA_APIKEY(), Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });
    if (!r.ok) return null;
    const u = await r.json();
    if (!u?.id) return null;
    return { id: String(u.id), email: String(u.email || '').toLowerCase() };
  } catch {
    return null;
  }
}
