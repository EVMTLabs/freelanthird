import type { Category, Skill } from '@prisma/client';

export interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  visible: boolean;
  wallets: UserWallet[];
  role: 'admin' | 'user';
  createdAt: Date;
  updatedAt: Date;
}

export interface UserWallet {
  id: string;
  userId: string;
  address: string;
  chainId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BasicUserInfo {
  email?: string;
  name: string;
  username: string;
  avatar?: string;
  isFreelancer: boolean;
}

export interface FreelancerProfile {
  category: Category | null;
  description: string | null;
  skills: Skill[] | null;
  isComplete: boolean;
  visible: boolean;
}
