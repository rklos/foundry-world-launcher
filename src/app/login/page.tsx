'use client';

import { Button, Input } from 'antd';
import { LockOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useState } from 'react';

export default function Login() {
  const [ password, setPassword ] = useState<string>('');

  function onLogin() {
    // TODO: use next-auth to login
  }

  return (
    <main className="flex items-center h-full">
      <Input onChange={ (e) => setPassword(e.target.value) }
             prefix={ <LockOutlined /> }
             type="password"
             autoComplete="off"
             placeholder="Password" />
      <Button onClick={ () => onLogin() }
              icon={ <ArrowRightOutlined /> }
              type="primary"
              className="ml-2" />
    </main>
  );
}
