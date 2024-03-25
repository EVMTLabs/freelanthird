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
      wallet: {
        connect: { userId },
      },
    },
  });
};

export const findJobCategories = async () => {
  return prisma.category.findMany({
    orderBy: {
      priority: 'asc',
    },
  });
};

export const findJobCategoriesWithSkills = async () => {
  return prisma.category.findMany({
    orderBy: {
      priority: 'asc',
    },
    include: {
      skills: true,
    },
  });
};

export const findJobs = async () => {
  return prisma.job.findMany({
    take: 100,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
      skills: true,
      category: true,
    },
  });
};

export const findJobById = async (id: string) => {
  return prisma.job.findFirst({
    where: {
      id,
    },
    include: {
      skills: {
        select: {
          name: true,
        },
      },
      user: {
        select: {
          username: true,
          name: true,
          avatar: true,
          createdAt: true,
        },
      },
      wallet: {
        select: {
          address: true,
        },
      },
    },
  });
};

export const findJobsMetadata = async () => {
  return prisma.job.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      title: true,
      createdAt: true,
      user: {
        select: {
          name: true,
        },
      },
    },
  });
};
