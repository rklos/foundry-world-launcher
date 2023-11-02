import { getApi } from '~/services/api/getApi';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '~/libs/auth';
import { cookies } from 'next/headers';

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  const { foundry } = getApi(cookies().toString());
  const usersOnline = await foundry.usersOnline();

  if (usersOnline === 0) redirect('/');

  return (
    <main>
      Some users are online! Please wait for them to finish their session.
    </main>
  );
}
