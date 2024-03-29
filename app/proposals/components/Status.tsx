import { ProposalStatus } from '@prisma/client';
import clsx from 'clsx';

export const Status = ({ status }: { status: ProposalStatus }) => {
  const statusColor = {
    [ProposalStatus.ACCEPTED]: 'badge-success',
    [ProposalStatus.DISPUTED]: 'badge-error',
    [ProposalStatus.IN_PROGRESS]: 'badge-neutral',
    [ProposalStatus.PENDING]: 'badge-warning',
    [ProposalStatus.REJECTED]: 'badge-error',
  };

  const statusText = {
    [ProposalStatus.ACCEPTED]: 'Accepted',
    [ProposalStatus.DISPUTED]: 'In Dispute',
    [ProposalStatus.IN_PROGRESS]: 'In Progress',
    [ProposalStatus.PENDING]: 'Pending',
    [ProposalStatus.REJECTED]: 'Rejected',
  };

  return (
    <span className={clsx('badge whitespace-nowrap', statusColor[status])}>
      {statusText[status]}
    </span>
  );
};
