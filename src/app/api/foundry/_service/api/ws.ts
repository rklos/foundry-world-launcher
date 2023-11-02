import { io } from 'socket.io-client';
import type { Socket } from 'socket.io-client';

export default class WebSocket {
  private readonly socket: Socket;

  get emit(): Socket['emit'] {
    return this.socket.emit.bind(this.socket);
  }

  get on(): Socket['on'] {
    return this.socket.on.bind(this.socket);
  }

  get once(): Socket['once'] {
    return this.socket.once.bind(this.socket);
  }

  constructor(sessionToken: string) {
    this.socket = io(`wss://${process.env.FOUNDRY_URL}`, {
      path: '/socket.io',
      transports: [ 'websocket' ],
      query: { session: sessionToken },
      autoConnect: false,
    });
  }

  connect() {
    if (this.socket.connected) return this.socket;

    this.socket.connect();

    // this.socket.onAny((...args) => console.log('WS <-', ...args));
    this.socket.onAnyOutgoing((...args) => console.log('WS', ...args));

    return new Promise<Socket>((resolve) => {
      this.once('session', () => {
        resolve(this.socket);
      });
    });
  }

  disconnect() {
    return new Promise<void>((resolve) => {
      this.once('disconnect', () => {
        resolve();
      });

      this.socket?.disconnect();
    });
  }
}
