'use server';

import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { v4 as uuidv4 } from 'uuid';

import { s3Client } from '@/config/aws';
import prisma from '@/prisma/db';
import { getServerSession } from '@/session/getServerSession';

export const createUser = async ({
  address,
  chainId,
}: {
  address: string;
  chainId: number;
}) => {
  return prisma.user.create({
    data: {
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
  } catch (error) {
    console.error('Error updating user info', error);
  }
};

export const findUserByUsername = async (username: string) => {
  return prisma.user.findFirst({
    where: {
      username: {
        equals: username,
        mode: 'insensitive',
      },
    },
  });
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

  const imagePath = `users/profiles/avatars/${uuidv4()}`;

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
