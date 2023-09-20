'use client';

import { Card } from 'antd';
import type { World } from '~/services/api/foundry/types';
import { LaunchButton } from '~/components/home/LaunchButton';
import { useContext } from 'react';
import { EnvContext } from '~/env-context';

interface Props {
  data: World;
}

export function World({ data }: Props) {
  const env = useContext(EnvContext);

  const defaultCover = 'ui/backgrounds/setup.webp';
  const coverUrl = `${env.FOUNDRY_PROTO}://${env.FOUNDRY_URL}/${data.background || defaultCover}`;

  // eslint-disable-next-line @next/next/no-img-element
  const coverImage = <img src={ coverUrl } alt={ data.id } className="h-36 object-cover" />;

  const worldActions = [ <LaunchButton id={ data.id } /> ];

  return (
    <Card cover={ coverImage }
          className="w-60"
          actions={ worldActions }>
      <Card.Meta title={ data.title } description={ data.id } />
    </Card>
  );
}
