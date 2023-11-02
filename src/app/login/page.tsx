'use client';

import { Button, Input, Space } from 'antd';
import { LockOutlined, ArrowRightOutlined } from '@ant-design/icons';
import type { ChangeEvent } from 'react';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [ password, setPassword ] = useState('');
  const [ error, setError ] = useState(false);
  const [ loading, setLoading ] = useState(false);

  async function onPasswordChange(e: ChangeEvent<HTMLInputElement>) {
    setError(false);
    setPassword(e.target.value);
  }

  async function onLogin() {
    if (loading) return;
    setLoading(true);

    const result = (await signIn('credentials', { redirect: false, password }))!;

    if (!result.ok) {
      setLoading(false);
      setError(true);
      return;
    }

    router.push('/');
  }

  return (
    <main className="flex justify-center h-full flex-col">
      <Space direction="horizontal">
        <Input onChange={ (e) => onPasswordChange(e) }
               onPressEnter={ () => onLogin() }
               prefix={ <LockOutlined /> }
               status={ error ? 'error' : undefined }
               type="password"
               autoComplete="off"
               placeholder="Password" />
        <Button onClick={ () => onLogin() }
                icon={ <ArrowRightOutlined /> }
                shape="circle"
                loading={ loading }
                type="primary" />
      </Space>
      { error && <span className="text-red-500 mt-2">Incorrect password</span> }
    </main>
  );
}
