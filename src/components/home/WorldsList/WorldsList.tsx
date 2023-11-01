'use client';

import { World } from '~/components/home/WorldsList/World/World';
import { Space } from 'antd';
import { useState, useEffect } from 'react';
import { getApi } from '~/services/api/getApi';
import type { World as WorldType } from '~/services/api/foundry/types';

interface Props {
  worlds: WorldType[];
}

export default function WorldsList({ worlds }: Props) {
  const { foundry } = getApi();

  const [ currentWorld, setCurrentWorld ] = useState<string | null>(null);
  const updateCurrentWorld = async () => {
    const world = await foundry.getCurrentWorld();
    setCurrentWorld(world);
  };

  useEffect(() => {
    updateCurrentWorld();
  }, []);

  return (
    <Space direction="horizontal" size="middle">
      { worlds.map((world) => (
        <World data={ world }
               isCurrent={ currentWorld === world.id }
               onLaunch={ () => updateCurrentWorld() }
               key={ world.id } />
      )) }
    </Space>
  );
}
