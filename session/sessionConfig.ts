import type { SessionOptions } from 'iron-session';

export interface SessionData {
  username: string | null;
  nonce: string;
  isLoggedIn: boolean;
  address: string;
  chainId: number;
  role: string;
  userId: string;
  token: string;
}

export const defaultSession: SessionData = {
  isLoggedIn: false,
  nonce: '',
  address: '',
  chainId: 0,
  role: 'user',
  userId: '',
  token: '',
  username: null,
};

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET!,
  cookieName: 'freelanthird-session',
  ttl: 86400,
  cookieOptions: {
    // secure only works in `https` environments
    // if your localhost is not on `https`, then use: `secure: process.env.NODE_ENV === "production"`
    secure: process.env.NODE_ENV === 'production',
    maxAge: 86400 - 60,
  },
};
