import type { ProposalStatus } from '@prisma/client';

export interface Proposal {
  id: string;
  amount: number;
  status: ProposalStatus;
  createdAt: Date;
  freelancerAddress: string;
  job: {
    id: string;
    title: string;
    user: {
      username: string | null;
    };
  } | null;
  user: {
    username: string | null;
    avatar: string | null;
  } | null;
}
