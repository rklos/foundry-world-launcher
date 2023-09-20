import '../globals.css';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import Providers from '~/providers';

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
    <html lang="en" className="w-screen h-screen">
      <body className="w-full h-full flex flex-col items-center p-16">
        <h1 className="text-2xl mb-8">Foundry World Launcher</h1>
        <Providers env={ publicEnv }>
          { children }
        </Providers>
      </body>
    </html>
  );
}
