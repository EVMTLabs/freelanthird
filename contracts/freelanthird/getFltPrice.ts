import { Token } from '@uniswap/sdk-core';
import IUniswapV3PoolABI from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json';
import Quoter from '@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json';
import { computePoolAddress, FeeAmount } from '@uniswap/v3-sdk';
import {
  createPublicClient,
  formatUnits,
  getContract,
  http,
  parseUnits,
} from 'viem';
import { arbitrum } from 'viem/chains';

interface TokenConfig {
  tokens: {
    in: Token;
    amountIn: number;
    out: Token;
    poolFee: number;
  };
}

const POOL_FACTORY_CONTRACT_ADDRESS =
  '0x1F98431c8aD98523631AE4a59f267346ea31F984';
const QUOTER_CONTRACT_ADDRESS = '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6';

const WETH_TOKEN = new Token(
  arbitrum.id,
  '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
  18,
  'WETH',
  'Wrapped Ether',
);

const USDC_TOKEN = new Token(
  arbitrum.id,
  '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
  6,
  'USDC',
  'USD//C',
);

export const currentConfig: TokenConfig = {
  tokens: {
    in: WETH_TOKEN,
    amountIn: 1,
    out: USDC_TOKEN,
    poolFee: FeeAmount.MEDIUM,
  },
};

const client = createPublicClient({
  chain: arbitrum,
  transport: http(),
});

async function getPoolConstants(): Promise<{
  token0: string;
  token1: string;
  fee: number;
}> {
  const currentPoolAddress = computePoolAddress({
    factoryAddress: POOL_FACTORY_CONTRACT_ADDRESS,
    tokenA: currentConfig.tokens.in,
    tokenB: currentConfig.tokens.out,
    fee: currentConfig.tokens.poolFee,
  });

  const poolContract = getContract({
    address: currentPoolAddress as `0x${string}`,
    abi: IUniswapV3PoolABI.abi,
    client,
  });

  const [token0, token1, fee] = (await Promise.all([
    poolContract.read.token0(),
    poolContract.read.token1(),
    poolContract.read.fee(),
  ])) as [string, string, number];

  return {
    token0,
    token1,
    fee,
  };
}

export async function getQuotePrice(): Promise<string> {
  const quoterContract = getContract({
    address: QUOTER_CONTRACT_ADDRESS,
    abi: Quoter.abi,
    client,
  });

  const poolConstants = await getPoolConstants();

  const quotedAmountOut = (await quoterContract.read.quoteExactInputSingle([
    poolConstants.token0,
    poolConstants.token1,
    poolConstants.fee,
    parseUnits(currentConfig.tokens.amountIn.toString(), 18),
    0,
  ])) as bigint;

  return formatUnits(quotedAmountOut, currentConfig.tokens.out.decimals);
}
