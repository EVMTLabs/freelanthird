'use client';

import { useCallback, useEffect, useMemo } from 'react';
import { parseUnits } from 'viem';
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';

import { freelanthirdContractAddress } from '@/contracts';
import { usePayTokenStore } from '@/stores/usePayTokenStore';

export const useAllowance = () => {
  const { address } = useAccount();
  const { token, tokenAmount } = usePayTokenStore();

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
    address: token.address as `0x${string}`,
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

  const increaseAllowance = useCallback(() => {
    console.log(token.decimals);
    return writeContract({
      address: token.address as `0x${string}`,
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
        parseUnits(tokenAmount.toString(), token.decimals),
      ],
    });
  }, [token.decimals, tokenAmount]);

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
