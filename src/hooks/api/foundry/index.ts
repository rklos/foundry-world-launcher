import type ky from 'ky';
import type { ApiResponse } from '~/hooks/api/types';
import type { World } from './types';

export async function getWorlds(api: typeof ky): Promise<World[]> {
  const response = await api.get('foundry/worlds').json<ApiResponse<World[]>>();
  if (response.status === 'error') return [];
  return response.data;
}
