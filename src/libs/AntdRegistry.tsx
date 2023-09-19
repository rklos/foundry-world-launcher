'use client';

import { useMemo } from 'react';
import type { ReactNode } from 'react';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import type Entity from '@ant-design/cssinjs/es/Cache';
import { useServerInsertedHTML } from 'next/navigation';

function StyledComponentsRegistry({ children }: { children: ReactNode }) {
  // eslint-disable-next-line react-hooks/exhaustive-deps -- `createCache` is required to be called only once.
  const cache = useMemo<Entity>(() => createCache(), [ createCache ]);
  useServerInsertedHTML(() => (
    // eslint-disable-next-line react/no-danger -- It's safe to use `dangerouslySetInnerHTML` here.
    <style id="antd" dangerouslySetInnerHTML={ { __html: extractStyle(cache, true) } } />
  ));
  return <StyleProvider cache={ cache }>{ children }</StyleProvider>;
}

export default StyledComponentsRegistry;
