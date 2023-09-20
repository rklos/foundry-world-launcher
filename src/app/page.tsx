import { getApi } from '~/services/api/getApi';
import { World } from '~/components/home/World';
import { Space } from 'antd';

export default async function Home() {
  // TODO: use next-auth to check if user is logged in
  const { foundry } = getApi();

  const worlds = await foundry.getWorlds();

  return (
    <main>
      <Space direction="horizontal" size="middle">
        { worlds.map((world) => <World data={ world } key={ world.id } />) }
      </Space>
    </main>
  );
}
