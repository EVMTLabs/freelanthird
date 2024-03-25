import jwt from 'jsonwebtoken';
import { generateNonce, SiweErrorType, SiweMessage } from 'siwe';

import { createUser, findUserByAddress } from '@/actions/users';
import { getServerSession } from '@/session/getServerSession';

export const PUT = async () => {
  try {
    const session = await getServerSession();

    session.nonce = generateNonce();

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

  const countryIso = req.headers.get('x-vercel-ip-country') ?? undefined;
  const region = req.headers.get('x-vercel-ip-country-region') ?? undefined;
  const city = req.headers.get('x-vercel-ip-city') ?? undefined;
  const ip = req.headers.get('x-forwarded-for') ?? undefined;

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
        ip,
        region,
        city,
        address: fields.address,
        chainId: fields.chainId,
        country: countryIso,
      });
    }

    const { id, role, username, avatar, isFreelancer, email, name, createdAt } =
      user;

    session.userId = id;
    session.role = role;
    session.isFreelancer = isFreelancer;
    session.username = username ?? undefined;
    session.avatar = avatar ?? undefined;
    session.email = email ?? undefined;
    session.name = name ?? undefined;
    session.isLoggedIn = true;
    session.createdAt = createdAt;

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
