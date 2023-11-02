'use client';

import type { ReactNode } from 'react';
import { Button, Layout } from 'antd';
import { PoweroffOutlined, GithubOutlined } from '@ant-design/icons';
import { signOut } from 'next-auth/react';

const { Header, Content } = Layout;

interface Props {
  children: ReactNode;
}

export default function AntdLayout({ children }: Props) {
  const github = () => {
    window.open('https://github.com/rklos/foundry-world-launcher');
  };

  return (
    <Layout className="w-screen min-h-screen">
      <Header className="flex items-center text-white bg-gradient-to-r from-orange-700 via-amber-500 to-black">
        <div className="text-xl">Foundry World Launcher</div>
        <div className="flex-1" />
        <Button icon={ <GithubOutlined className="text-white !text-xl" /> }
                className="mx-4"
                onClick={ () => github() }
                type="text" />
        <Button icon={ <PoweroffOutlined /> }
                onClick={ () => signOut() }
                ghost>
          Logout
        </Button>
      </Header>
      <Content className="p-16">
        { children }
      </Content>
    </Layout>
  );
}
