import { Result } from 'antd';

export default async function Error() {
  return (
    <main>
      <Result status="error"
              title="Server error!"
              subTitle="Something went wrong. Please try again later." />
    </main>
  );
}
