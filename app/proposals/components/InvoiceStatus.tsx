'use client';

import type { ReactElement } from 'react';
import { ProposalStatus } from '@prisma/client';
import clsx from 'clsx';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export const InvoiceStatus = ({ status }: { status: ProposalStatus }) => {
  if (status === ProposalStatus.PENDING) {
    return null;
  }

  const statusProps: Record<
    string,
    { text: string; icon: ReactElement | null; className: string }
  > = {
    [ProposalStatus.ACCEPTED]: {
      text: 'The freelancer has accepted the proposal.',
      icon: <CheckCircle />,
      className: 'alert-success',
    },
    [ProposalStatus.REJECTED]: {
      text: 'Proposal has been rejected.',
      icon: <XCircle />,
      className: 'alert-error',
    },
    [ProposalStatus.DISPUTED]: {
      text: 'This proposal is being disputed.',
      icon: <AlertTriangle />,
      className: 'alert-warning',
    },
  };

  return (
    <div className={clsx('alert', statusProps[status].className)}>
      {statusProps[status].icon}
      <p className="text-lg font-medium">{statusProps[status].text}</p>
    </div>
  );
};
