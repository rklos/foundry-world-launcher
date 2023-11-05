import { getApi } from '~/services/api/getApi';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '~/libs/auth';
import { cookies } from 'next/headers';
import { Result } from 'antd';
import RefreshButton from '~/components/common/RefreshButton';

export default async function Offline() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  const { foundry } = getApi(cookies().toString());
  const isFoundryOnline = await foundry.isOnline();

  if (isFoundryOnline) redirect('/');

  return (
    <main>
      <Result status="500"
              title="Foundry is offline"
              subTitle="Please check your Foundry server and try again."
              extra={ <RefreshButton /> } />
    </main>
  );
}
