import { NextResponse } from 'next/server';
import Foundry from '../_service';

export async function GET() {
  const foundry = new Foundry();
  const usersOnline = await foundry.usersOnline();
  return NextResponse.json({ status: 'ok', data: usersOnline });
}
