import '../globals.css';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import Providers from '~/providers';
import AntdLayout from '~/components/layout/antd-layout';

export const metadata: Metadata = {
  title: 'Foundry World Launcher',
  description: 'Generated by create next app',
};

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  const publicEnv = {
    FOUNDRY_PROTO: process.env.FOUNDRY_PROTO,
    FOUNDRY_URL: process.env.FOUNDRY_URL,
  };

  return (
    <html lang="en">
      <body>
        <AntdLayout>
          <Providers env={ publicEnv }>
            { children }
          </Providers>
        </AntdLayout>
      </body>
    </html>
  );
}
