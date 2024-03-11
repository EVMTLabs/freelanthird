import jwt from 'jsonwebtoken';
import { generateNonce, SiweErrorType, SiweMessage } from 'siwe';

import { createUser, findUserByAddress } from '@/actions/users';
import { getServerSession } from '@/session/getServerSession';

export const PUT = async () => {
  try {
    const session = await getServerSession();

    if (!session?.nonce) {
      session.nonce = generateNonce();
    }

    await session.save();

    return new Response(session.nonce);
  } catch (error) {
    console.error(error);
    return Response.json({
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

    let user = await findUserByAddress(fields.address);

    if (!user) {
      user = await createUser({
        address: fields.address,
        chainId: fields.chainId,
      });
    }

    const { id, role, username, avatar, isFreelancer, email, name } = user;

    session.userId = id;
    session.role = role;
    session.isFreelancer = isFreelancer;
    session.username = username ?? undefined;
    session.avatar = avatar ?? undefined;
    session.email = email ?? undefined;
    session.name = name ?? undefined;
    session.isLoggedIn = true;

    const token = jwt.sign(
      { username: username, userId: id, role: role },
      process.env.JWT_SECRET!,
      {
        expiresIn: '2d',
      },
    );

    session.token = token;

    await session.save();
  } catch (error) {
    console.error(error);
    switch (error) {
      case SiweErrorType.INVALID_NONCE:
        return Response.json({
          message: 'Invalid nonce',
          status: 422,
        });
      case SiweErrorType.INVALID_SIGNATURE:
        return Response.json({
          message: 'Invalid signature',
          status: 401,
        });

      default:
        return Response.json({
          message: 'Internal server error',
          status: 500,
        });
    }
  }

  return Response.json(session);
};
