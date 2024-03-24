'use client';

import { useEffect, useMemo } from 'react';
import { parseUnits } from 'viem';
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';

import { freelanthirdAddress } from '@/contracts/freelanthird';
import { fltAddress, usdcAddress } from '@/contracts/tokens';

const CONTRACT_ADDRESSES: Record<string, `0x${string}`> = {
  FLT: fltAddress,
  USDC: usdcAddress,
};

export const useAllowance = ({
  token,
  amount,
}: {
  token: string;
  amount: number;
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
    address: CONTRACT_ADDRESSES[token],
    functionName: 'allowance',
    args: [address as `0x${string}`, freelanthirdAddress],
  });

  const hasAllowance = useMemo(() => Number(allowance) >= amount, [allowance]);

  const {
    data: hash,
    isPending,
    writeContract,
    isError: isWriteError,
  } = useWriteContract();

  const increaseAllowance = () => {
    return writeContract({
      address: CONTRACT_ADDRESSES[token],
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
      args: [freelanthirdAddress, parseUnits(amount.toString(), 18)],
    });
  };

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    isError: isConfirmationError,
  } = useWaitForTransactionReceipt({
    hash,
    confirmations: 2,
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
  };
};
