import type { SessionOptions } from 'iron-session';

export interface SessionData {
  nonce: string;
  isLoggedIn: boolean;
  address: `0x${string}`;
  chainId: number;
  role: string;
  userId: string;
  token: string;
  username?: string;
  name?: string;
  email?: string;
  isFreelancer: boolean;
  avatar?: string;
  createdAt: Date;
}

export const defaultSession: SessionData = {
  isLoggedIn: false,
  nonce: '',
  address: '0x',
  chainId: 0,
  role: 'user',
  userId: '',
  token: '',
  isFreelancer: false,
  createdAt: new Date(),
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
