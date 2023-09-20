import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '~/libs/auth';
import Foundry from '~/app/api/foundry/_service';

let isRunning = false;

export async function POST(req: NextRequest, { params }: { params: Record<string, string> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ status: 'error', error: 'Unauthorized' }, { status: 401 });

  if (!params.id) return NextResponse.json({ status: 'error', error: 'Invalid World ID' }, { status: 400 });
  if (isRunning) return NextResponse.json({ status: 'error', error: 'Already Running' }, { status: 400 });

  isRunning = true;

  try {
    const foundry = new Foundry();
    await foundry.login();
    await foundry.launchWorld(params.id);
    await foundry.logout();
  } catch {
    isRunning = false;
    return NextResponse.json({ status: 'error', error: 'Server Error' }, { status: 500 });
  }

  isRunning = false;

  return NextResponse.json({ status: 'ok' });
}
