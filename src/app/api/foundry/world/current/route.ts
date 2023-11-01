import { NextResponse } from 'next/server';
import Foundry from '../../_service';

export async function GET() {
  const foundry = new Foundry();
  const currentWorld = await foundry.getCurrentWorld();
  return NextResponse.json({ status: 'ok', data: currentWorld || null });
}
