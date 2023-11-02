'use client';

import { World } from '~/components/home/WorldsList/World/World';
import { Space } from 'antd';
import { useState } from 'react';
import { getApi } from '~/services/api/getApi';
import type { World as WorldType } from '~/services/api/foundry/types';
import { wait } from '~/utils/wait';

interface Props {
  worlds: WorldType[];
  initialCurrentWorld: string | null;
}

export default function WorldsList({ worlds, initialCurrentWorld }: Props) {
  const { foundry } = getApi();

  const [ currentWorld, setCurrentWorld ] = useState<string | null>(initialCurrentWorld);
  const updateCurrentWorld = async () => {
    setCurrentWorld(null);

    let world = null;
    let attempts = 0;
    do {
      attempts += 1;
      world = await foundry.getCurrentWorld();
      await wait(250);
    } while (world === null && attempts < 20);

    if (world === null) {
      throw new Error('Could not get current world');
    }

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
