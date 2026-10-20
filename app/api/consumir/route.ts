import { NextRequest, NextResponse } from 'next/server';
import { tokenFrom, verifyUser } from '@/lib/verifyUser';
import { cobrar } from '@/lib/creditos';

// Atividades prontas das centrais (folha gerada ou kit): imprimir/baixar usa 1 crédito.
// Não chama a IA — só confere e desconta o saldo, com as mesmas regras de /api/claude.
export async function POST(request: NextRequest) {
  const token = tokenFrom(request.headers.get('authorization'));
  if (!token) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });

  const user = await verifyUser(token);
  if (!user) return NextResponse.json({ error: 'Token inválido' }, { status: 401 });

  const cob = await cobrar(user, 1);
  if (!cob.ok) return NextResponse.json(cob.body, { status: cob.status });

  const restante = cob.restante === null ? 'ilimitado' : String(cob.restante);
  return NextResponse.json({ ok: true, restante }, { headers: { 'X-Credits-Remaining': restante } });
}
