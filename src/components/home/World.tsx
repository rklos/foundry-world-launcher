import { Card } from 'antd';
import type { World } from '~/hooks/api/foundry/types';

interface Props {
  data: World;
}

export function World({ data }: Props) {
  return (
    <Card title={ data.title }
          size="small">
      <h2>{ data.title }</h2>
    </Card>
  );
}
