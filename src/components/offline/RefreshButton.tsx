'use client';

import { Button } from 'antd';
import { useRouter } from 'next/navigation';

export default function RefreshButton() {
  const router = useRouter();
  return (
    <Button type="primary"
            onClick={ () => router.refresh() }>
      Refresh
    </Button>
  );
}
