import type { SessionOptions } from 'iron-session';

export interface SessionData {
  username: string;
  nonce?: string;
  isLoggedIn: boolean;
  address?: string;
  chainId?: number;
}

export const defaultSession: SessionData = {
  username: '',
  isLoggedIn: false,
  nonce: '',
  address: '',
  chainId: 0,
};

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET!,
  cookieName: 'freelanthird-session',
  cookieOptions: {
    // secure only works in `https` environments
    // if your localhost is not on `https`, then use: `secure: process.env.NODE_ENV === "production"`
    secure: process.env.NODE_ENV === 'production',
  },
};
