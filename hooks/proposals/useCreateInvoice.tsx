'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { parseUnits } from 'viem';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

import { freelanthirdContractAddress, tokenAddresses } from '@/contracts';
import { freelanthirdAbi } from '@/contracts/freelanthird/abi';
import { usePayTokenStore } from '@/stores/usePayTokenStore';

import { useAllowance } from './useAllowance';

interface CreateInvoiceProps {
  freelancerAddress: string;
  proposalId: string;
}

export const useCreateInvoice = ({
  freelancerAddress,
  proposalId,
}: CreateInvoiceProps) => {
  const [isPaying, setIsPaying] = useState(false);
  const [isWaitingAllowance, setIsWaitingAllowance] = useState(false);

  const { token, tokenAmount } = usePayTokenStore();

  const router = useRouter();

  const {
    allowance,
    hasAllowance,
    increaseAllowance,
    isWaitingAllowanceTransaction,
    isAllowanceError,
  } = useAllowance({
    token,
    tokenAmount,
  });

  const {
    data: paymentHash,
    isPending: isPendingPayment,
    isError: isPaymentError,
    error: paymentError,
    writeContract,
  } = useWriteContract();

  useEffect(() => {
    if (hasAllowance && isWaitingAllowance) {
      setIsWaitingAllowance(false);
      handlePayment();
    }
  }, [allowance]);

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
      address: freelanthirdContractAddress,
      abi: freelanthirdAbi,
      functionName: 'createProposal',
      args: [
        freelancerAddress,
        tokenAddress,
        parseUnits(tokenAmount.toString(), 18),
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
      router.refresh();
      router.replace(`/proposals/${proposalId}`);
    } else if (
      isPaymentError ||
      isAllowanceError ||
      isPaymentConfirmationError
    ) {
      setIsPaying(false);
      console.error(paymentError);
      if (!paymentError?.message.includes('User rejected the request')) {
        toast.error('Failed to create invoice');
      }
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
    isPaymentConfirmed,
    isWaitingTransaction:
      isPaying ||
      isPendingPayment ||
      isConfirmingPayment ||
      isWaitingAllowanceTransaction,
  };
};
