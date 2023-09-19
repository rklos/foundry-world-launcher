'use client';

import { useMemo } from 'react';
import type { ReactNode } from 'react';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import type Entity from '@ant-design/cssinjs/es/Cache';
import { useServerInsertedHTML } from 'next/navigation';

function StyledComponentsRegistry({ children }: { children: ReactNode }) {
  const cache = useMemo<Entity>(() => createCache(), [ createCache ]);
  useServerInsertedHTML(() => (
    <style id="antd" dangerouslySetInnerHTML={ { __html: extractStyle(cache, true) } } />
  ));
  return <StyleProvider cache={ cache }>{ children }</StyleProvider>;
}

export default StyledComponentsRegistry;
