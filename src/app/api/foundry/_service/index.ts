import { wait } from '~/utils/wait';
import type { FoundryStatus } from '~/app/api/foundry/_service/types';
import type { World } from '~/services/api/foundry/types';
import type { Socket } from 'socket.io-client';
import type ky from 'ky';
import { getRestApi, getSessionToken } from './api/rest';
import WebSocket from './api/ws';

export default class Foundry {
  private api!: typeof ky;
  private sessionToken!: string;
  private socket!: Socket;
  private socketSession!: WebSocket;

  async isOnline(): Promise<boolean> {
    return !!(await this.getStatus())?.version;
  }

  async usersOnline(): Promise<number | undefined> {
    return (await this.getStatus())?.users;
  }

  async login() {
    this.api = await getRestApi();

    const formData = new FormData();
    formData.append('action', 'adminAuth');
    formData.append('adminPassword', process.env.FOUNDRY_ADMIN_PASSWORD!);

    await this.api.post('auth', { body: formData, redirect: 'error' })
      .catch((error) => {
        if (error.cause.message === 'unexpected redirect') return;
        throw error;
      });
    this.sessionToken = getSessionToken();

    await this.connectToSocket();
  }

  async logout() {
    const formData = new FormData();
    formData.append('action', 'adminLogout');

    await this.api.post('auth', { body: formData, redirect: 'error' })
      .catch((error) => {
        if (error.cause.message === 'unexpected redirect') return;
        throw error;
      });
    await this.socketSession.disconnect();
  }

  async shutdownWorld() {
    const formData = new FormData();
    formData.append('action', 'shutdown');
    formData.append('adminPassword', process.env.FOUNDRY_ADMIN_PASSWORD!);
    formData.append('password', '');
    formData.append('userid', '');

    await this.api.post('join', { body: formData });

    let isWorldRunning = true;
    let attempts = 0;
    do {
      console.log(`Waiting for world to shutdown... (attempts: ${++attempts})`);
      isWorldRunning = !!(await this.getCurrentWorld());
      // Wait for world to shutdown completely.
      if (isWorldRunning) await wait(250);
    } while (isWorldRunning || attempts > 20);

    if (isWorldRunning) throw new Error('Failed to shutdown world.');
  }

  async launchWorld(id: string) {
    // Very important. You will receive 'Insufficient permissions' error without it.
    const isWorldRunning = !!(await this.getCurrentWorld());
    if (isWorldRunning) {
      await this.shutdownWorld();
    }

    const formData = new FormData();
    formData.append('action', 'launchWorld');
    formData.append('world', id);

    await this.api.post('setup', { body: formData });
  }

  async getWorldsList(): Promise<World[]> {
    const currentWorld = await this.getCurrentWorld();

    if (currentWorld) {
      await this.shutdownWorld();
    }

    if (!this.socket.connected) {
      await this.connectToSocket();
    }

    const worlds = await new Promise((resolve) => {
      // TODO: potential timeout issue.
      this.socketSession.emit('getSetupData', (data: any) => {
        resolve(data.worlds);
      });
    }) as World[];

    if (currentWorld) {
      await this.launchWorld(currentWorld);
    }

    return worlds || [];
  }

  async getCurrentWorld(): Promise<string | undefined> {
    return (await this.getStatus())?.world;
  }

  async getStatus(): Promise<FoundryStatus | undefined> {
    const api = await getRestApi({ session: false });
    return api.get('api/status', { cache: 'no-cache' })
      .json<FoundryStatus | undefined>()
      .catch(() => undefined);
  }

  private async connectToSocket() {
    this.socketSession = new WebSocket(this.sessionToken);
    this.socket = await this.socketSession.connect();
  }
}
