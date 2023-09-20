import ky from 'ky';
import { getWorlds, launchWorld } from '~/services/api/foundry';

export function getApi() {
  const api = ky.create({
    prefixUrl: `${globalThis?.location?.origin || process.env.HOST || `http://localhost:${process.env.PORT}`}/api`,
    timeout: 30 * 1000,
    next: { revalidate: 3600 },
  });

  return {
    api,
    foundry: {
      getWorlds: () => getWorlds(api),
      launchWorld: (id: string) => launchWorld(api, id),
    },
  };
}
