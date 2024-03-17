'use server';

import { createPresignedPost } from '@aws-sdk/s3-presigned-post';

import { s3Client } from '@/config/aws';
import prisma from '@/prisma/db';
import { getServerSession } from '@/session/getServerSession';

export const createUser = async ({
  address,
  chainId,
  country,
  ip,
  region,
  city,
}: {
  address: string;
  chainId: number;
  country?: string;
  ip?: string;
  region?: string;
  city?: string;
}) => {
  return prisma.user.create({
    data: {
      country,
      ip,
      region,
      city,
      wallets: {
        create: {
          address,
          chainId,
        },
      },
    },
  });
};

export const findUserByAddress = async (address: string) => {
  return prisma.user.findFirst({
    where: {
      wallets: {
        some: {
          address,
        },
      },
    },
  });
};

export const findUserByUsername = async (username: string) => {
  return prisma.user.findFirst({
    where: {
      username: {
        equals: username,
      },
      visible: true,
    },
    select: {
      username: true,
      avatar: true,
      createdAt: true,
      name: true,
      isFreelancer: true,
      freelancer: {
        select: {
          category: true,
          description: true,
          skills: {
            select: {
              name: true,
            },
          },
        },
      },
      jobs: {
        take: 50,
        select: {
          id: true,
          title: true,
          description: true,
          minPrice: true,
          maxPrice: true,
          createdAt: true,
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
          description: true,
          category: true,
          skills: true,
        },
      },
    },
  });
};

export const checkIfUsernameExists = async (username: string) => {
  const result = await prisma.user.findFirst({
    where: {
      username: {
        equals: username,
        mode: 'insensitive',
      },
    },
    select: {
      username: true,
    },
  });

  return Boolean(result);
};

export const updateUserInfo = async ({
  email,
  name,
  username,
  avatar,
  isFreelancer,
}: {
  email?: string;
  name: string;
  username: string;
  avatar?: string;
  isFreelancer: boolean;
}) => {
  const session = await getServerSession();

  if (!session.userId) {
    throw new Error('Unauthorized');
  }

  session.username = username;
  session.name = name;
  session.email = email;
  session.avatar = avatar;
  session.isFreelancer = isFreelancer;

  try {
    await prisma.user.update({
      where: {
        id: session.userId,
      },
      data: {
        email,
        name,
        username,
        avatar,
        isFreelancer,
      },
    });

    await session.save();

    return session;
  } catch (error) {
    console.error('Error updating user info', error);
    throw new Error('Error updating user info');
  }
};

export const createS3ProfileImage = async ({
  contentType,
}: {
  contentType: string;
}) => {
  const { userId } = await getServerSession();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  const allowedContentTypes = ['image/jpeg', 'image/png', 'image/gif'];

  if (!contentType || !allowedContentTypes.includes(contentType)) {
    throw new Error('Bad request');
  }

  const imageId = btoa(userId + process.env.BASE64_SECRET);

  const imagePath = `users/profiles/avatars/${imageId}`;

  const { url, fields } = await createPresignedPost(s3Client, {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: imagePath,
    Conditions: [
      ['content-length-range', 0, 1 * 1024 * 1024], // up to 1 MB
      ['starts-with', '$Content-Type', contentType],
    ],
    Fields: {
      acl: 'public-read',
      'Content-Type': contentType,
    },
    Expires: 600, // Seconds before the presigned post expires. 3600 by default.
  });

  return { url, fields, imagePath };
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

export const updateUserDescription = async (description: string) => {
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
        description,
      },
    });
  } catch (error) {
    console.error('Error updating user info', error);
    throw new Error('Error updating user info');
  }
};

export const updateUserVisibility = async (visible: boolean) => {
  const session = await getServerSession();

  if (!session.userId) {
    throw new Error('Unauthorized');
  }

  try {
    await prisma.user.update({
      where: {
        id: session.userId,
      },
      data: {
        visible,
      },
    });
  } catch (error) {
    console.error('Error updating user info', error);
    throw new Error('Error updating user info');
  }
};

export const updateUserSettings = async ({
  name,
  email,
}: {
  name: string;
  email: string;
}) => {
  const session = await getServerSession();

  if (!session.userId) {
    throw new Error('Unauthorized');
  }

  try {
    await prisma.user.update({
      where: {
        id: session.userId,
      },
      data: {
        name,
        email,
      },
    });
  } catch (error) {
    console.error('Error updating user info', error);
    throw new Error('Error updating user info');
  }
};
