'use client';

import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

import { freelanthirdAbi, freelanthirdAddress } from '@/contracts/freelanthird';

export const useCloseProposal = ({ invoiceId }: { invoiceId: number }) => {
  const [isTransacting, setIsTransacting] = useState(false);

  const {
    data: hash,
    isPending,
    writeContract,
    isError: isWriteError,
    error,
  } = useWriteContract();

  const closeProposal = useCallback(() => {
    setIsTransacting(true);
    writeContract({
      address: freelanthirdAddress,
      abi: freelanthirdAbi,
      functionName: 'closeProposal',
      args: [BigInt(3)],
    });
  }, [invoiceId]);

  const { isSuccess, isError: isTransactionError } =
    useWaitForTransactionReceipt({
      hash,
      confirmations: 2,
    });

  useEffect(() => {
    if (isWriteError || isTransactionError) {
      setIsTransacting(false);
      toast.error('Failed to close proposal');
    }
  }, [isWriteError, isTransactionError]);

  console.log(error);

  return {
    closeProposal,
    hash,
    isPending,
    isTransacting,
    isSuccess,
  };
};
