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
