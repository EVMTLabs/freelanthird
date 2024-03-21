'use server';

import prisma from '@/prisma/db';
import { getServerSession } from '@/session/getServerSession';
import { CustomError } from '@/utils/error';

interface CreateProposalInput {
  title: string;
  description: string;
  amount: number;
  freelancerAddress: string;
  clientAddress: string;
  jobId?: string;
}

export const createProposal = async ({
  title,
  description,
  amount,
  freelancerAddress,
  clientAddress,
  jobId,
}: CreateProposalInput) => {
  const { userId, address } = await getServerSession();

  if (!userId) {
    throw new CustomError('User is not authenticated', 401);
  }

  try {
    const lastproposal = await prisma.proposal.findFirst({
      where: {
        jobId,
        freelancerAddress: address,
      },
      select: {
        id: true,
      },
    });

    if (lastproposal) {
      throw new CustomError(
        'You have already submitted a proposal for this job',
        409,
      );
    }

    await prisma.proposal.create({
      data: {
        title,
        description,
        amount,
        freelancerAddress,
        clientAddress,
        job: {
          connect: { id: jobId },
        },
      },
    });
  } catch (error: unknown) {
    console.error('Error creating proposal', error);
    throw new Error(
      error instanceof CustomError
        ? error.message
        : 'An error occurred while creating proposal, try again later',
    );
  }
};
