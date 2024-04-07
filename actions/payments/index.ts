'use server';

import prisma from '@/prisma/db';

export const findTokenList = async () => {
  const tokenList = await prisma.paymentToken.findMany({
    select: {
      address: true,
      symbol: true,
      price: true,
      fee: true,
      decimals: true,
    },
  });

  return tokenList
    .map((token) => ({
      ...token,
      price: Number(token.price),
      fee: Number(token.fee),
    }))
    .sort((a, b) => b.symbol.localeCompare(a.symbol));
};
