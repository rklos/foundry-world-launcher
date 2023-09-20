import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import Foundry from '../../../_service';

let isRunning = false;

export async function POST(request: NextRequest, { params }: { params: Record<string, string> }) {
  // TODO: check user permissions

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
