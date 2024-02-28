'use server';

import prisma from '@/prisma/db';
import type { Job } from '@/types/jobs';

export const createJob = async (jobValues: Job) => {
  return prisma.job.create({
    data: {
      ...jobValues,
      minPrice: jobValues.minPrice || 0,
      maxPrice: jobValues.maxPrice || 0,
    },
  });
};
