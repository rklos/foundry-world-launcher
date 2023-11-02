import { NextResponse } from 'next/server';
import Foundry from './_service';

export const revalidate = 0;

export async function GET() {
  const foundry = new Foundry();
  const isOnline = await foundry.isOnline();
  return NextResponse.json({ status: 'ok', data: isOnline ? 'online' : 'offline' });
}
