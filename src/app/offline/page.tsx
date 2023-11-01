import { getApi } from '~/services/api/getApi';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '~/libs/auth';
import { cookies } from 'next/headers';

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/api/auth/signin');

  const { foundry } = getApi(cookies().toString());
  const isFoundryOnline = await foundry.isOnline();

  if (isFoundryOnline) redirect('/');

  return (
    <main>
      Foundry is offline!
    </main>
  );
}
