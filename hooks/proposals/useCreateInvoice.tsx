'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { parseUnits } from 'viem';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

import { freelanthirdAddress } from '@/contracts/freelanthird';
import { usePayTokenStore } from '@/stores/usePayTokenStore';

import { useAllowance } from './useAllowance';

interface CreateInvoiceProps {
  amount: number;
  freelancerAddress: string;
  proposalId: string;
}

export const useCreateInvoice = ({
  amount,
  freelancerAddress,
  proposalId,
}: CreateInvoiceProps) => {
  const [isPaying, setIsPaying] = useState(false);
  const [isWaitingAllowance, setIsWaitingAllowance] = useState(false);

  const { token } = usePayTokenStore();

  const router = useRouter();

  const {
    allowance,
    hasAllowance,
    increaseAllowance,
    isWaitingAllowanceTransaction,
    isAllowanceError,
  } = useAllowance({
    token,
    amount,
  });

  const {
    data: paymentHash,
    isPending: isPendingPayment,
    isError: isPaymentError,
    writeContract,
  } = useWriteContract();

  useEffect(() => {
    usePayTokenStore.setState({ amount, isLoading: false });
  }, [amount]);

  useEffect(() => {
    if (hasAllowance && isWaitingAllowance) {
      setIsWaitingAllowance(false);
      handlePayment();
    }
  }, [allowance]);

  const tokenAddresses: Record<string, string> = {
    FLT: '0x157663871ee4D333b705e1F0DE6b03750c6D7B67',
    USDC: '0xcC22104e92B940f71B8Bb4bCF6053BF5960Bf93d',
    USDT: '0x2c4b0B1C7B96e4D1a1e4D4f29d91c5BfCfA9b9f0',
  };

  const tokenAddress = useMemo(() => {
    return tokenAddresses[token];
  }, [token]);

  const handlePayment = useCallback(() => {
    if (
      isPendingPayment ||
      isConfirmingPayment ||
      isWaitingAllowanceTransaction
    )
      return;

    if (!hasAllowance) {
      setIsWaitingAllowance(true);
      return increaseAllowance();
    }

    writeContract({
      address: freelanthirdAddress,
      abi: [
        {
          inputs: [
            { internalType: 'address', name: '_freelance', type: 'address' },
            { internalType: 'address', name: '_tokenAddress', type: 'address' },
            { internalType: 'uint256', name: 'amount', type: 'uint256' },
            { internalType: 'string', name: '_uuid', type: 'string' },
          ],
          name: 'createProposal',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ],
      functionName: 'createProposal',
      args: [
        freelancerAddress,
        tokenAddress,
        parseUnits(amount.toString(), 18),
        proposalId,
      ],
    });
  }, [hasAllowance, isPaying]);

  const {
    isLoading: isConfirmingPayment,
    isSuccess: isPaymentConfirmed,
    isError: isPaymentConfirmationError,
  } = useWaitForTransactionReceipt({
    hash: paymentHash,
    confirmations: 2,
  });

  useEffect(() => {
    if (isPaymentConfirmed) {
      router.push(`/proposals/${proposalId}`);
    } else if (
      isPaymentError ||
      isAllowanceError ||
      isPaymentConfirmationError
    ) {
      setIsPaying(false);
      toast.error('Failed to create invoice');
    }
  }, [
    isPaymentConfirmed,
    isPaymentError,
    isAllowanceError,
    isPaymentConfirmationError,
  ]);

  return {
    token,
    handlePayment,
    isWaitingTransaction:
      isPaying ||
      isPendingPayment ||
      isConfirmingPayment ||
      isWaitingAllowanceTransaction,
    isPaymentConfirmed: isPaymentConfirmed,
  };
};
