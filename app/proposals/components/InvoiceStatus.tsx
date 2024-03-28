'use client';

import type { ReactElement } from 'react';
import { ProposalStatus } from '@prisma/client';
import clsx from 'clsx';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export const InvoiceStatus = ({
  status,
  isClient,
}: {
  status: ProposalStatus;
  isClient: boolean;
}) => {
  if (status === ProposalStatus.PENDING) {
    return null;
  }

  const statusProps: Record<
    string,
    { text: string; icon: ReactElement | null; className: string }
  > = {
    [ProposalStatus.ACCEPTED]: {
      text: 'Proposal closed successfully. Funds have been released to the freelancer.',
      icon: <CheckCircle />,
      className: 'alert-neutral',
    },
    [ProposalStatus.IN_PROGRESS]: {
      text: isClient
        ? 'After the freelancer completes the work, your approval is necessary to initiate fund release.'
        : 'Once you finish the job you must contact the customer to approve the payment.',
      icon: <CheckCircle />,
      className: 'alert-neutral',
    },
    [ProposalStatus.REJECTED]: {
      text: 'Proposal has been rejected.',
      icon: <XCircle />,
      className: 'alert-error',
    },
    [ProposalStatus.DISPUTED]: {
      text: 'This proposal is being disputed.',
      icon: <AlertTriangle />,
      className: 'alert-error',
    },
  };

  return (
    <div className={clsx('alert mb-4', statusProps[status].className)}>
      {statusProps[status].icon}
      <p className="text-lg font-medium">{statusProps[status].text}</p>
    </div>
  );
};
