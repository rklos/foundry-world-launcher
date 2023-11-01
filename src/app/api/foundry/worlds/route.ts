import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '~/libs/auth';
import type { World } from '~/services/api/foundry/types';
import Foundry from '../_service';

let worldsCache: World[] = [];

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ status: 'error', error: 'Unauthorized' }, { status: 401 });

  let worlds: World[] = worldsCache;

  if (!worldsCache.length) {
    const foundry = new Foundry();
    await foundry.login();
    worlds = await foundry.getWorldsList();
    await foundry.logout();

    worldsCache = worlds;
  }

  return NextResponse.json({ status: 'ok', data: worlds });
}
