'use client';

import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { parseUnits } from 'viem';
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';

import { freelanthirdContractAddress } from '@/contracts';
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
  const { address } = useAccount();

  const router = useRouter();

  const {
    allowance,
    hasAllowance,
    increaseAllowance,
    isWaitingAllowanceTransaction,
    isAllowanceError,
    allowanceError,
  } = useAllowance();

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
      abi: [
        {
          inputs: [
            { internalType: 'address', name: '_freelance', type: 'address' },
            { internalType: 'address', name: '_tokenAddress', type: 'address' },
            { internalType: 'uint256', name: 'amount', type: 'uint256' },
            { internalType: 'string', name: '_uuid', type: 'string' },
          ],
          name: 'createInvoice',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ],
      functionName: 'createInvoice',
      args: [
        freelancerAddress,
        address,
        parseUnits(tokenAmount.toString(), token.decimals),
        proposalId,
      ],
    });
  }, [hasAllowance, isPaying, token.decimals, tokenAmount]);

  const {
    isLoading: isConfirmingPayment,
    isSuccess: isPaymentConfirmed,
    isError: isPaymentConfirmationError,
  } = useWaitForTransactionReceipt({
    hash: paymentHash,
    confirmations: 3,
  });

  useEffect(() => {
    if (isPaymentConfirmed) {
      router.replace(`/proposals/${proposalId}`);
    } else if (
      isPaymentError ||
      isAllowanceError ||
      isPaymentConfirmationError
    ) {
      setIsPaying(false);
      console.error(paymentError);
      if (allowanceError) {
        console.error(allowanceError);
        toast.error('Failed to increase allowance');
      } else if (!paymentError?.message.includes('User rejected the request')) {
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
