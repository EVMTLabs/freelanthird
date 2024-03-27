'use client';

import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

import { freelanthirdContractAddress } from '@/contracts';

export const useCloseProposal = ({ invoiceId }: { invoiceId: number }) => {
  const [isTransacting, setIsTransacting] = useState(false);

  const {
    data: hash,
    isPending,
    writeContract,
    isError: isWriteError,
  } = useWriteContract();

  const closeProposal = useCallback(() => {
    setIsTransacting(true);
    writeContract({
      address: freelanthirdContractAddress,
      abi: [
        {
          inputs: [
            { internalType: 'uint256', name: 'proposalId', type: 'uint256' },
          ],
          name: 'closeProposal',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ],
      functionName: 'closeProposal',
      args: [BigInt(invoiceId)],
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

  return {
    closeProposal,
    hash,
    isPending,
    isTransacting,
    isSuccess,
  };
};
