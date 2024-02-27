'use server';

import prisma from '@/prisma/db';

import type { JobFormValues } from '../context/CreateJobContext';

export const createJob = async (jobValues: JobFormValues) => {
  return prisma.job.create({
    data: {
      ...jobValues,
      minPrice: jobValues.minPrice || 0,
      maxPrice: jobValues.maxPrice || 0,
    },
  });
};
