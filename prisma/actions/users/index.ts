'use server';

import prisma from '@/prisma/db';

export const createUser = async ({
  address,
  chainId,
}: {
  address: string;
  chainId: number;
}) => {
  return prisma.user.create({
    data: {
      wallets: {
        create: {
          address,
          chainId,
        },
      },
    },
  });
};

export const findUserByAddress = async (address: string) => {
  return prisma.user.findFirst({
    where: {
      wallets: {
        some: {
          address,
        },
      },
    },
  });
};

export const updateUserInfo = async ({
  userId,
  email,
  name,
  username,
}: {
  userId: string;
  email?: string;
  name: string;
  username: string;
}) => {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      email,
      name,
      username,
    },
  });
};

export const findUserByUsername = async (username: string) => {
  return prisma.user.findFirst({
    where: {
      username: {
        equals: username,
        mode: 'insensitive',
      },
    },
  });
};
