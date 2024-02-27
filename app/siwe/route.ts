import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { generateNonce,SiweErrorType, SiweMessage } from 'siwe';

import type { SessionData} from './session';
import { sessionOptions } from './session';

export const GET = async () => {
  console.log('get session');
  try {
    const session = await getIronSession<SessionData>(
      cookies(),
      sessionOptions,
    );

    return NextResponse.json(session);
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: 'Internal server error',
      status: 500,
    });
  }
};

export const PUT = async () => {
  console.log('generate nonce');
  try {
    const session = await getIronSession<SessionData>(
      cookies(),
      sessionOptions,
    );

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
  console.log('verify message');
  const { message, signature } = await req.json();
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  console.log(session.nonce);

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

  await session.save();

  return Response.json(session);
};

export const DELETE = async () => {
  try {
    const session = await getIronSession<SessionData>(
      cookies(),
      sessionOptions,
    );

    if (!session) {
      return NextResponse.json({
        message: 'No session found',
        status: 404,
      });
    }

    session.destroy();

    return NextResponse.json({
      message: 'Session destroyed',
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: 'Internal server error',
      status: 500,
    });
  }
};
