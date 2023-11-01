import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '~/libs/auth';
import Foundry from '../_service';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ status: 'error', error: 'Unauthorized' }, { status: 401 });

  const foundry = new Foundry();
  await foundry.login();
  const worlds = await foundry.getWorldsList();
  await foundry.logout();

  return NextResponse.json({ status: 'ok', data: worlds });
}
