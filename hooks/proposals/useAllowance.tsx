'use client';

import { useEffect, useMemo } from 'react';
import { parseUnits } from 'viem';
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';

import type { Token } from '@/contracts';
import {
  freelanthirdContractAddress,
  TOKEN_DECIMALS,
  tokenAddresses,
} from '@/contracts';

export const useAllowance = ({
  token,
  tokenAmount,
}: {
  token: Token;
  tokenAmount: number;
}) => {
  const { address } = useAccount();
  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    abi: [
      {
        inputs: [
          { internalType: 'address', name: 'owner', type: 'address' },
          { internalType: 'address', name: 'spender', type: 'address' },
        ],
        name: 'allowance',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    address: tokenAddresses[token],
    functionName: 'allowance',
    args: [address as `0x${string}`, freelanthirdContractAddress],
  });

  const hasAllowance = useMemo(
    () => Number(allowance) >= parseUnits(tokenAmount.toString(), 18),
    [allowance, tokenAmount],
  );

  const {
    data: hash,
    isPending,
    writeContract,
    isError: isWriteError,
    error: writeError,
  } = useWriteContract();

  const increaseAllowance = () => {
    return writeContract({
      address: tokenAddresses[token],
      abi: [
        {
          inputs: [
            { internalType: 'address', name: 'spender', type: 'address' },
            { internalType: 'uint256', name: 'value', type: 'uint256' },
          ],
          name: 'approve',
          outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ],
      functionName: 'approve',
      args: [
        freelanthirdContractAddress,
        parseUnits(tokenAmount.toString(), TOKEN_DECIMALS[token]),
      ],
    });
  };

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    isError: isConfirmationError,
  } = useWaitForTransactionReceipt({
    hash,
    confirmations: 3,
  });

  useEffect(() => {
    const handleRefetch = async () => {
      await refetchAllowance();
    };

    if (isConfirmed) {
      handleRefetch();
    }
  }, [isConfirmed]);

  return {
    allowance,
    hasAllowance,
    increaseAllowance,
    isWaitingAllowanceTransaction: isPending || isConfirming,
    isAllowanceConfirmed: isConfirmed,
    refetchAllowance,
    isAllowanceError: isWriteError || isConfirmationError,
    allowanceError: writeError,
  };
};
