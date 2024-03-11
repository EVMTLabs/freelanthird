'use server';

import prisma from '@/prisma/db';
import { getServerSession } from '@/session/getServerSession';
import type { Job } from '@/types/jobs';

export const createJob = async (jobValues: Job) => {
  const { userId } = await getServerSession();

  return prisma.job.create({
    data: {
      title: jobValues.title,
      description: jobValues.description,
      size: jobValues.size,
      duration: jobValues.duration,
      experience: jobValues.experience,
      minPrice: jobValues.minPrice || 0,
      maxPrice: jobValues.maxPrice || 0,
      skills: {
        connect: jobValues.skills.map((skillId) => ({ id: skillId })),
      },
      category: {
        connect: { id: jobValues.category },
      },
      user: {
        connect: { id: userId },
      },
    },
  });
};

export const findJobCategories = async () => {
  return prisma.category.findMany({
    include: {
      skills: true,
    },
  });
};
