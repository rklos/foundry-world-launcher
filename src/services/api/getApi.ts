import type { Options } from 'ky';
import ky from 'ky';
import {
  isOnline, usersOnline, getWorldsList, getCurrentWorld, launchWorld,
} from '~/services/api/foundry';

export function getApi(cookies?: string) {
  const host = globalThis?.location?.origin || process.env.HOST || `http://localhost:${process.env.PORT}`;
  const apiOptions: Options = {
    prefixUrl: `${host}/api`,
    timeout: 30 * 1000,
    credentials: 'include',
    headers: {
      Cookie: cookies,
    },
    throwHttpErrors: false,
  };

  const api = ky.create({
    ...apiOptions,
    cache: 'no-cache',
  });

  const apiWithCache = ky.create({
    ...apiOptions,
    next: {
      // Next throws a warning about mixing "cache" and "revalidate", but I don't use "cache",
      // so I don't know why it's complaining. Maybe it's because Next 14?
      // Anyway, it works, so I'm ignoring it.
      revalidate: 3 * 60 * 60,
    },
  });

  return {
    api,
    foundry: {
      isOnline: () => isOnline(api),
      usersOnline: () => usersOnline(api),
      getWorldsList: () => getWorldsList(apiWithCache),
      getCurrentWorld: () => getCurrentWorld(api),
      launchWorld: (id: string) => launchWorld(api, id),
    },
  };
}
