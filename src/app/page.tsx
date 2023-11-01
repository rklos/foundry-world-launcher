import { getApi } from '~/services/api/getApi';
import { World } from '~/components/home/World';
import { Space } from 'antd';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '~/libs/auth';
import { cookies } from 'next/headers';

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/api/auth/signin');

  const { foundry } = getApi(cookies().toString());

  const isFoundryOnline = await foundry.isOnline();
  if (!isFoundryOnline) redirect('/offline');

  const areUsersOnline = !!(await foundry.usersOnline());
  if (areUsersOnline) redirect('/users-online');

  const worlds = await foundry.getWorlds();
  if (!worlds) redirect('/error');

  const currentWorld = await foundry.getCurrentWorld();

  return (
    <main>
      <Space direction="horizontal" size="middle">
        { worlds.map((world) => (
          <World data={ world }
                 isCurrent={ currentWorld === world.id }
                 key={ world.id } />
        )) }
      </Space>
    </main>
  );
}
