import ky from 'ky';
import {
  isOnline, usersOnline, getWorldsList, getCurrentWorld, launchWorld,
} from '~/services/api/foundry';

export function getApi(cookies?: string) {
  const host = globalThis?.location?.origin || process.env.HOST || `http://localhost:${process.env.PORT}`;
  const api = ky.create({
    prefixUrl: `${host}/api`,
    timeout: 30 * 1000,
    credentials: 'include',
    headers: {
      Cookie: cookies,
    },
  });

  return {
    api,
    foundry: {
      isOnline: () => isOnline(api),
      usersOnline: () => usersOnline(api),
      getWorldsList: () => getWorldsList(api),
      getCurrentWorld: () => getCurrentWorld(api),
      launchWorld: (id: string) => launchWorld(api, id),
    },
  };
}