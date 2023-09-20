import type ky from 'ky';
import type { ApiResponse } from '~/services/api/types';
import type { World } from './types';

export async function getWorlds(api: typeof ky): Promise<World[]> {
  const response = await api.get('foundry/worlds').json<ApiResponse<World[]>>();
  if (response.status === 'error') return [];
  return response.data!;
}

export async function launchWorld(api: typeof ky, id: string): Promise<boolean> {
  const response = await api.post(`foundry/world/${id}/launch`).json<ApiResponse>();
  return response.status !== 'error';
}
