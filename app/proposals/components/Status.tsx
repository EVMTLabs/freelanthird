import { ProposalStatus } from '@prisma/client';
import clsx from 'clsx';

export const Status = ({ status }: { status: ProposalStatus }) => {
  const statusColor = {
    [ProposalStatus.ACCEPTED]: 'badge-success',
    [ProposalStatus.DISPUTED]: 'badge-warning',
    [ProposalStatus.IN_PROGRESS]: 'badge-neutral',
    [ProposalStatus.PENDING]: 'badge-warning',
    [ProposalStatus.REJECTED]: 'badge-error',
  };

  return (
    <span className={clsx('badge', statusColor[status])}>
      {status.toLowerCase()}
    </span>
  );
};
