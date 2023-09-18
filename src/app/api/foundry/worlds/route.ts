import { NextResponse } from 'next/server';
import Foundry from '~/service/foundry';

export const revalidate = 24 * 60 * 60;

export async function GET() {
  // TODO: check user permissions

  const foundry = new Foundry();
  await foundry.login();
  const worlds = await foundry.getWorlds();
  await foundry.logout();

  return NextResponse.json({ status: 'ok', data: worlds });
}
