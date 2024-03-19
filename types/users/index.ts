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
  title: string | null;
  description: string | null;
  skills: Skill[] | null;
  isComplete: boolean;
}

export interface Freelancer {
  freelancer: {
    title: string | null;
    category: {
      id: string;
      name: string;
    } | null;
    id: string;
    description: string | null;
    skills: {
      id: string;
      name: string;
    }[];
  } | null;
  email: string | null;
  name: string | null;
  username: string | null;
  avatar: string | null;
  country: string | null;
}
