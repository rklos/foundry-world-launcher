import CredentialsProvider from 'next-auth/providers/credentials';
import type { AuthOptions } from 'next-auth';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (credentials?.password === process.env.LAUNCHER_PASSWORD) {
          return { id: 'gm' };
        }

        return null;
      },
    }),
  ],
};
