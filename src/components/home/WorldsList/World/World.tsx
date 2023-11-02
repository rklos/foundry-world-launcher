import { Card, message, Tag } from 'antd';
import type { World } from '~/services/api/foundry/types';
import { LaunchButton } from '~/components/home/WorldsList/World/LaunchButton';
import { useContext } from 'react';
import { EnvContext } from '~/env-context';
import { CurrentWorldRibbon } from '~/components/home/WorldsList/World/CurrentWorldRibbon';

interface Props {
  data: World;
  isCurrent: boolean;
  onLaunch: () => void;
}

export function World({ data, isCurrent, onLaunch }: Props) {
  const env = useContext(EnvContext);
  const [ messageApi, contextHolder ] = message.useMessage();

  const defaultCover = 'ui/backgrounds/setup.webp';
  const coverUrl = `${env.FOUNDRY_PROTO}://${env.FOUNDRY_URL}/${data.background || defaultCover}`;

  // eslint-disable-next-line @next/next/no-img-element
  const CoverImage = <img src={ coverUrl } alt={ data.id } className="h-36 object-cover" />;
  const WorldActions = [ <LaunchButton id={ data.id } messageApi={ messageApi } onLaunch={ () => onLaunch() } /> ];
  const Tags = (
    <>
      <Tag bordered={ false }>id: { data.id }</Tag>
      <Tag bordered={ false } color="blue">{ data.system }</Tag>
    </>
  );

  return (
    <>
      { contextHolder }
      <CurrentWorldRibbon isCurrent={ isCurrent }>
        <Card cover={ CoverImage }
              className="w-60"
              actions={ WorldActions }>
          <Card.Meta title={ data.title } description={ Tags } />
        </Card>
      </CurrentWorldRibbon>
    </>
  );
}
