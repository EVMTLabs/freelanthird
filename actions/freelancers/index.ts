'use server';

import prisma from '@/prisma/db';
import { getServerSession } from '@/session/getServerSession';

export const findFreelancers = async () => {
  return prisma.user.findMany({
    where: {
      isFreelancer: true,
      visible: true,
      freelancer: {
        isComplete: true,
      },
    },
    select: {
      name: true,
      email: true,
      avatar: true,
      country: true,
      username: true,
      freelancer: {
        select: {
          id: true,
          description: true,
          category: {
            select: {
              id: true,
              name: true,
            },
          },
          skills: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });
};

export const findFreelancerProfile = async (userId: string) => {
  return prisma.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      isFreelancer: true,
      visible: true,
      description: true,
      freelancer: {
        select: {
          isComplete: true,
          title: true,
          description: true,
          category: true,
          skills: true,
        },
      },
    },
  });
};

export const updateFreelancerProfile = async ({
  description,
  category,
  skills,
  visible,
}: {
  description: string;
  category: string;
  skills: string[];
  visible: boolean;
}) => {
  const session = await getServerSession();

  if (!session.userId) {
    throw new Error('Unauthorized');
  }

  try {
    return prisma.user.update({
      where: {
        id: session.userId,
      },
      data: {
        visible,
        freelancer: {
          connectOrCreate: {
            where: {
              userId: session.userId,
            },
            create: {
              isComplete: true,
              description,
              category: {
                connect: {
                  id: category,
                },
              },
              skills: {
                connect: skills.map((skill) => ({
                  id: skill,
                })),
              },
            },
          },
        },
      },
      select: {
        visible: true,
        freelancer: {
          select: {
            isComplete: true,
          },
        },
      },
    });
  } catch (error) {
    console.error('Error updating user info', error);
    throw new Error('Error updating user info');
  }
};
