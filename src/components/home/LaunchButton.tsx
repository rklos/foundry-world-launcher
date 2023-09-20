import { LoadingOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { getApi } from '~/services/api/getApi';
import { Popconfirm, message } from 'antd';

interface Props {
  id: string;
}

export function LaunchButton({ id }: Props) {
  const [ messageApi, contextHolder ] = message.useMessage();
  const { foundry } = getApi();
  const { mutate, isLoading } = useMutation({ mutationFn: foundry.launchWorld });

  function onSuccess() {
    messageApi.open({
      type: 'success',
      content: `World launched! (id:${id})`,
      key: `launch-${id}`,
      duration: 3,
    });
  }
  function onError() {
    messageApi.open({
      type: 'error',
      content: `Failed to launch world! (id:${id})`,
      key: `launch-${id}`,
      duration: 3,
    });
  }

  function onClick() {
    if (isLoading) return;
    messageApi.open({
      type: 'loading',
      content: 'Launching...',
      key: `launch-${id}`,
      duration: 35,
    });
    mutate(id, { onSuccess, onError });
  }

  return (
    <>
      { contextHolder }
      { !isLoading && (
        <Popconfirm title="Launch world?"
                    description="This will discard any unsaved changes"
                    okText="Launch"
                    onConfirm={ () => onClick() }>
          <div>
            <PlayCircleOutlined />
          </div>
        </Popconfirm>
      ) }
      { isLoading && <div className="cursor-default"><LoadingOutlined /></div> }
    </>
  );
}
