import type { AxiosInstance } from 'axios';
import { wait } from '~/util/wait';
import { getRestApi, getSessionToken } from './api/rest';
import WebSocket from './api/ws';

export default class Foundry {
  private api!: AxiosInstance;
  private sessionToken!: string;
  private socket!: WebSocket;

  async login() {
    this.api = await getRestApi();

    const formData = new FormData();
    formData.append('action', 'adminAuth');
    formData.append('adminPassword', process.env.FOUNDRY_ADMIN_PASSWORD!);

    await this.api.post('auth', formData);
    this.sessionToken = getSessionToken();

    this.socket = new WebSocket(this.sessionToken);
    await this.socket.connect();
  }

  async logout() {
    const formData = new FormData();
    formData.append('action', 'adminLogout');

    await this.api.post('auth', formData);
    await this.socket.disconnect();
  }

  async shutdownWorld() {
    const formData = new FormData();
    formData.append('action', 'shutdown');
    formData.append('adminPassword', process.env.FOUNDRY_ADMIN_PASSWORD!);
    formData.append('password', '');
    formData.append('userid', '');

    await this.api.post('join', formData);
    // Wait for world to shutdown fully
    await wait(1000);
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

    await this.api.post('setup', formData);
  }

  async getWorlds() {
    const currentWorld = await this.getCurrentWorld();

    if (currentWorld) {
      await this.shutdownWorld();
    }

    const worlds = await new Promise((resolve) => {
      this.socket.emit('getSetupData', (data: any) => {
        resolve(data.worlds);
      });
    });

    if (currentWorld) {
      await this.launchWorld(currentWorld);
    }

    return worlds;
  }

  getCurrentWorld() {
    return new Promise<string | undefined>((resolve) => {
      this.socket.emit('getJoinData', (data: any) => {
        resolve(data.world ? data.world.id : undefined);
      });
    });
  }
}