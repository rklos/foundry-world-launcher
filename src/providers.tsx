'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { useState } from 'react';
import StyledComponentsRegistry from '~/libs/AntdRegistry';
import type { Env } from '~/env-context';
import { EnvContext } from '~/env-context';

interface Props {
  env: Env;
  children: ReactNode;
}

export default function Providers({ children, env }: Props) {
  const [ queryClient ] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={ queryClient }>
      <StyledComponentsRegistry>
        <EnvContext.Provider value={ env }>
          { children }
        </EnvContext.Provider>
      </StyledComponentsRegistry>
    </QueryClientProvider>
  );
}
