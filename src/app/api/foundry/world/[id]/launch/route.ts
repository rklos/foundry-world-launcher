import { NextResponse, NextRequest } from 'next/server';
import Foundry from '../../../_service';

export async function POST(request: NextRequest, { params }: { params: Record<string, string> }) {
  // TODO: check user permissions

  if (!params.id) return NextResponse.json({ status: 'error', error: 'Invalid World ID' }, { status: 400 });

  const foundry = new Foundry();
  await foundry.login();
  await foundry.launchWorld(params.id);
  await foundry.logout();

  return NextResponse.json({ status: 'ok' });
}
