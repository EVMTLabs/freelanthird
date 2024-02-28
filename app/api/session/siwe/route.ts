import { NextResponse } from 'next/server';
import { generateNonce, SiweErrorType, SiweMessage } from 'siwe';

import { createUser } from '@/prisma/actions/users';
import { getServerSession } from '@/session/getServerSession';

export const PUT = async () => {
  try {
    const session = await getServerSession();

    console.log('session', session);

    if (!session?.nonce) {
      session.nonce = generateNonce();
    }

    await session.save();

    return new NextResponse(session.nonce);
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: 'Internal server error',
      status: 500,
    });
  }
};

export const POST = async (req: Request) => {
  const { message, signature } = await req.json();
  const session = await getServerSession();

  try {
    const siweMessage = new SiweMessage(message);
    const { data: fields } = await siweMessage.verify({
      signature,
      nonce: session.nonce,
    });

    if (fields.nonce !== session.nonce) {
      throw SiweErrorType.INVALID_NONCE;
    }

    session.address = fields.address;
    session.chainId = fields.chainId;

    const newUser = await createUser({
      address: fields.address,
      chainId: fields.chainId,
    });

    session.userId = newUser.id;
    session.role = newUser.role;
    session.isLoggedIn = true;

    await session.save();
  } catch (error) {
    console.error(error);
    switch (error) {
      case SiweErrorType.INVALID_NONCE:
        return NextResponse.json({
          message: 'Invalid nonce',
          status: 422,
        });
      case SiweErrorType.INVALID_SIGNATURE:
        return NextResponse.json({
          message: 'Invalid signature',
          status: 401,
        });

      default:
        return NextResponse.json({
          message: 'Internal server error',
          status: 500,
        });
    }
  }

  return Response.json(session);
};
