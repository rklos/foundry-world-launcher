import ky from 'ky';
import { getWorlds } from '~/hooks/api/foundry';

export function useApi() {
  const api = ky.create({
    prefixUrl: `${process.env.HOST || 'http://localhost:3000'}/api`,
    timeout: 30 * 1000,
    next: { revalidate: 3600 },
  });

  return {
    api,
    foundry: {
      getWorlds: () => getWorlds(api),
    },
  };
}
