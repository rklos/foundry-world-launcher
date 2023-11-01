import type ky from 'ky';
import type { ApiResponse } from '~/services/api/types';
import type { World } from './types';

export async function isOnline(api: typeof ky): Promise<boolean> {
  const response = await api.get('foundry').json<ApiResponse<'online' | 'offline'>>();
  if (response.status === 'error') return false;
  return response.data === 'online';
}

export async function usersOnline(api: typeof ky): Promise<number> {
  const response = await api.get('foundry/users-online').json<ApiResponse<number>>();
  if (response.status === 'error') return 0;
  return response.data!;
}

export async function getWorldsList(api: typeof ky): Promise<World[] | null> {
  const response = await api.get('foundry/worlds').json<ApiResponse<World[]>>();
  if (response.status === 'error') return null;
  return response.data!;
}

export async function getCurrentWorld(api: typeof ky): Promise<string | null> {
  const response = await api.get('foundry/world/current').json<ApiResponse<string | null>>();
  if (response.status === 'error') return null;
  return response.data!;
}

export async function launchWorld(api: typeof ky, id: string): Promise<boolean> {
  const response = await api.post(`foundry/world/${id}/launch`).json<ApiResponse>();
  return response.status !== 'error';
}
