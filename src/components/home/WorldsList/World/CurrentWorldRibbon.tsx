import { Badge } from 'antd';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  isCurrent: boolean;
}

export function CurrentWorldRibbon({ children, isCurrent }: Props) {
  return (
    <>
      { isCurrent && (
        <Badge.Ribbon text="Running" color="green">
          { children }
        </Badge.Ribbon>
      ) }
      { !isCurrent && children }
    </>
  );
}
