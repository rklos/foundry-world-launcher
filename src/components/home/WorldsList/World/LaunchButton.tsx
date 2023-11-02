import { LoadingOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { getApi } from '~/services/api/getApi';
import { Popconfirm, message } from 'antd';
import type { MessageInstance } from 'antd/es/message/interface';

interface Props {
  id: string;
  messageApi: MessageInstance;
  onLaunch: () => void;
}

export function LaunchButton({ id, messageApi, onLaunch }: Props) {
  const { foundry } = getApi();
  const { mutate, isPending } = useMutation({ mutationFn: foundry.launchWorld });

  function onSuccess() {
    messageApi.open({
      type: 'success',
      content: `World launched! (id: ${id})`,
      key: `launch-${id}`,
      duration: 3,
    });

    onLaunch();
  }
  function onError() {
    messageApi.open({
      type: 'error',
      content: `Failed to launch world! (id: ${id})`,
      key: `launch-${id}`,
      duration: 3,
    });
  }

  function onClick() {
    if (isPending) return;
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
      { !isPending && (
        <Popconfirm title="Launch world?"
                    description="This will discard any unsaved changes"
                    okText="Launch"
                    showCancel={ false }
                    onConfirm={ () => onClick() }>
          <div>
            <PlayCircleOutlined /> Launch
          </div>
        </Popconfirm>
      ) }
      { isPending && <div className="cursor-default"><LoadingOutlined /></div> }
    </>
  );
}
