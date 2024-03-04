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
