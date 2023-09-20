import { createContext } from 'react';

export type Env = Record<string, string | undefined>;

export const EnvContext = createContext<Env>({});
