'use server';

import prisma from '@/prisma/db';

export const findTokenList = async () => {
  const tokenList = await prisma.paymentToken.findMany({
    select: {
      id: true,
      address: true,
      symbol: true,
      price: true,
      fee: true,
      decimals: true,
      updatedAt: true,
    },
  });

  const maticTokenIndex = tokenList.findIndex(
    (token) => token.symbol === 'MATIC',
  );

  const currentTime = new Date();
  const diffInMinutes =
    (currentTime.getTime() -
      new Date(tokenList[maticTokenIndex].updatedAt).getTime()) /
    (1000 * 60);

  if (diffInMinutes >= 15) {
    try {
      const result = await fetch(
        `https://rest.coinapi.io/v1/exchangerate/matic/usd?apikey=${process.env.COINAPI_KEY}`,
      );
      const data = await result.json();
      tokenList[maticTokenIndex].price = data.rate;

      await prisma.paymentToken.update({
        where: {
          id: tokenList[maticTokenIndex].id,
        },
        data: {
          price: data.rate.toString(),
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  return tokenList
    .map((token) => ({
      ...token,
      price: Number(token.price),
      fee: Number(token.fee),
    }))
    .sort((a, b) => b.symbol.localeCompare(a.symbol));
};
