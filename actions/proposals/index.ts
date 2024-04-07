'use server';

import { ProposalStatus } from '@prisma/client';
import { customAlphabet } from 'nanoid';
import { revalidatePath } from 'next/cache';
import { unstable_noStore as noStore } from 'next/cache';

import prisma from '@/prisma/db';
import { getServerSession } from '@/session/getServerSession';
import { CustomError } from '@/utils/error';

interface CreateProposalInput {
  title: string;
  description: string;
  amount: number;
  freelancerAddress: string;
  clientAddress?: string;
  jobId?: string;
}

export const createProposal = async ({
  title,
  description,
  amount,
  clientAddress,
  jobId,
}: CreateProposalInput) => {
  const { userId, address } = await getServerSession();

  if (!userId) {
    throw new CustomError('User is not authenticated', 401);
  }

  try {
    if (jobId) {
      const lastProposal = await prisma.proposal.findFirst({
        where: {
          AND: [{ jobId }, { freelancerAddress: address }],
        },
        select: {
          id: true,
        },
      });

      if (lastProposal) {
        throw new CustomError(
          'You have already submitted a proposal for this job',
          409,
        );
      }
    }

    const result = await prisma.proposal.create({
      data: {
        title,
        description,
        amount,
        clientAddress,
        freelancerAddress: address,
        ...(jobId && { job: { connect: { id: jobId } } }),
      },
      select: {
        id: true,
      },
    });

    revalidatePath('/proposals/sent');

    return result;
  } catch (error: unknown) {
    console.error('Error creating proposal', error);
    throw new Error(
      error instanceof CustomError
        ? error.message
        : 'An error occurred while creating proposal, try again later',
    );
  }
};

export const findReceivedProposals = async (
  take: number = 10,
  skip: number = 0,
) => {
  noStore();

  const { address } = await getServerSession();

  if (!address) {
    throw new CustomError('User is not authenticated', 401);
  }

  return prisma.proposal.findMany({
    where: {
      clientAddress: address,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take,
    skip,
    select: {
      id: true,
      freelancerAddress: true,
      amount: true,
      status: true,
      createdAt: true,
      job: {
        select: {
          id: true,
          title: true,
          user: {
            select: {
              username: true,
            },
          },
        },
      },
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });
};

export const totalReceivedProposals = async () => {
  noStore();
  const { address } = await getServerSession();

  if (!address) {
    throw new CustomError('User is not authenticated', 401);
  }

  return prisma.proposal.count({
    where: {
      clientAddress: address,
    },
  });
};

export const findSentProposals = async () => {
  noStore();
  const { address } = await getServerSession();

  if (!address) {
    throw new CustomError('User is not authenticated', 401);
  }

  return prisma.proposal.findMany({
    where: {
      freelancerAddress: address,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      job: {
        select: {
          id: true,
          title: true,
          user: {
            select: {
              username: true,
            },
          },
        },
      },
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });
};

export const totalProposalsSent = async () => {
  noStore();
  const { address } = await getServerSession();

  if (!address) {
    throw new CustomError('User is not authenticated', 401);
  }

  return prisma.proposal.count({
    where: {
      freelancerAddress: address,
    },
  });
};

export const findProposalById = async (id: string) => {
  noStore();
  return prisma.proposal.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
          name: true,
          avatar: true,
        },
      },
    },
  });
};

export const findInvoiceWithProposalByProposalId = async (id: string) => {
  noStore();
  return prisma.invoice.findFirst({
    where: {
      proposalId: id,
    },
    select: {
      id: true,
      transactionId: true,
      usdAmount: true,
      tokenPrice: true,
      tokenAmount: true,
      freelancerAddress: true,
      clientAddress: true,
      proposal: {
        select: {
          title: true,
          description: true,
          createdAt: true,
          status: true,
          user: {
            select: {
              username: true,
              name: true,
              avatar: true,
            },
          },
          dispute: {
            select: {
              shortId: true,
            },
          },
        },
      },
      token: {
        select: {
          symbol: true,
          decimals: true,
          fee: true,
        },
      },
    },
  });
};

export const findInvoiceByProposalId = async (id: string) => {
  noStore();
  return prisma.invoice.findFirst({
    where: {
      proposalId: id,
    },
    select: {
      usdAmount: true,
      tokenPrice: true,
      tokenAmount: true,
      token: {
        select: {
          symbol: true,
          decimals: true,
          fee: true,
        },
      },
    },
  });
};

export const createDispute = async ({
  proposalId,
  description,
}: {
  proposalId: string;
  description: string;
}) => {
  const { userId } = await getServerSession();

  if (!userId) {
    throw new CustomError('User is not authenticated', 401);
  }

  const nanoid = customAlphabet('1234567890abcdef');
  const shortId = nanoid(10);

  try {
    await prisma.dispute.create({
      data: {
        shortId,
        description,
        proposal: {
          connect: { id: proposalId },
        },
      },
    });

    await prisma.proposal.update({
      where: {
        id: proposalId,
      },
      data: {
        status: ProposalStatus.DISPUTED,
      },
    });

    revalidatePath(`/proposals/${proposalId}`);
  } catch (error: unknown) {
    console.error('Error creating dispute', error);
    throw new Error(
      error instanceof CustomError
        ? error.message
        : 'An error occurred while creating dispute, try again later',
    );
  }
};
