import ky from 'ky';
import setCookie from 'set-cookie-parser';
import { StatefulSingleton } from '~/utils/stateful-singleton';

const apiCache = new StatefulSingleton<typeof ky>('api');
const sessionTokenCache = new StatefulSingleton<string>('sessionToken');

export async function getRestApi(options?: { session: boolean }) {
  let api = apiCache.value;
  if (api) return api;

  api = ky.create({ prefixUrl: `${process.env.FOUNDRY_PROTO}://${process.env.FOUNDRY_URL}` });

  if (options?.session !== false) {
    const loginPage = await api!.get('auth');
    sessionTokenCache.value = setCookie.parse(loginPage.headers.get('set-cookie') || '', { map: true }).session.value;
    const sessionToken = sessionTokenCache.value;
    api = api.extend({ headers: { Cookie: `session=${sessionToken}` } });
    // cache is worth only if we have a session token
    apiCache.value = api;
  }

  return api;
}

export function getSessionToken() {
  return sessionTokenCache.value!;
}
