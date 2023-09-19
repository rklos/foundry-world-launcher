import axios from 'axios';
import type { AxiosInstance } from 'axios';
import setCookie from 'set-cookie-parser';

let api: AxiosInstance;
let sessionToken: string;

export async function getRestApi() {
  if (api) return api;

  // TODO: refactor with `ky`
  api = axios.create({ baseURL: `https://${process.env.FOUNDRY_URL}` });

  api.interceptors.response.use((response) => {
    console.log(
      response.config.method?.toUpperCase(),
      `${response.config.baseURL}/${response.config.url}`,
      `[${response.status}]`,
    );
    return response;
  });

  const loginPage = await api.get('auth');

  sessionToken = setCookie.parse(loginPage.headers['set-cookie'] || '', { map: true }).session.value;
  api.defaults.headers.Cookie = `session=${sessionToken}`;

  return api;
}

export function getSessionToken() {
  return sessionToken;
}
