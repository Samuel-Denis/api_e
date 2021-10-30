
import { NextFunction, Response, Request } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '@shared/errors/appError';
import { UserRepository } from '@modules/user/infra/repositories/userRepository';
import auth from '@config/auth';

interface IPayload {
    sub : string;
}

async function ensureAuthenticated(
  req: Request, res: Response, next: NextFunction,
):Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token missing', 401);
  }


  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, auth.secret_token) as IPayload;

    const userRepository = new UserRepository();

    const user = await userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exists', 401);
    }
    req.user = {
      id: user.id,
    };

    next();
  } catch {
    throw new AppError('Invalid token', 401);
  }
}

export { ensureAuthenticated };
