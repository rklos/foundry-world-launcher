'use client';

import { World } from '~/components/home/WorldsList/World/World';
import { Space } from 'antd';
import { useState } from 'react';
import { getApi } from '~/services/api/getApi';
import type { World as WorldType } from '~/services/api/foundry/types';

interface Props {
  worlds: WorldType[];
  initialCurrentWorld: string | null;
}

export default function WorldsList({ worlds, initialCurrentWorld }: Props) {
  const { foundry } = getApi();

  const [ currentWorld, setCurrentWorld ] = useState<string | null>(initialCurrentWorld);
  const updateCurrentWorld = async () => {
    const world = await foundry.getCurrentWorld();
    setCurrentWorld(world);
  };

  return (
    <>
      <h1 className="text-2xl mb-4">Worlds</h1>
      <Space direction="horizontal"
             size="middle"
             align="start"
             wrap>
        { worlds.map((world) => (
          <World data={ world }
                 isCurrent={ currentWorld === world.id }
                 onLaunch={ () => updateCurrentWorld() }
                 key={ world.id } />
        )) }
      </Space>
    </>
  );
}
