import { useApi } from '~/hooks/api/useApi';
import { World } from '~/components/home/World';
import { Space } from 'antd';

export default async function Home() {
  // TODO: use next-auth to check if user is logged in
  const { foundry } = useApi();

  const worlds = await foundry.getWorlds();

  return (
    <main>
      <Space direction="vertical" size="middle" style={ { display: 'flex' } }>
        { worlds.map((world) => <World data={ world } key={ world.id } />) }
      </Space>
    </main>
  );
}
