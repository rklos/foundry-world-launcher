import { getApi } from '~/services/api/getApi';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '~/libs/auth';
import { cookies } from 'next/headers';
import RefreshButton from '~/components/common/RefreshButton';
import { Result } from 'antd';

export default async function UsersOnline() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  const { foundry } = getApi(cookies().toString());
  const usersOnline = await foundry.usersOnline();

  if (usersOnline === 0) redirect('/');

  return (
    <main>
      <Result status="403"
              title="Some users are online!"
              subTitle="Please wait for them to finish their session."
              extra={ <RefreshButton /> } />
    </main>
  );
}
