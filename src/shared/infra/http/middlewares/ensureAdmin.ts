import {
    NextFunction, Response, Request,
  } from 'express';
  
import { AppError } from '@shared/errors/appError';
import { UserRepository } from '@modules/user/infra/repositories/userRepository';
  
  async function ensureAdmin(
    req: Request, res: Response, next: NextFunction,
  ): Promise<void> {
    const { id } = req.user;
  
    const userRepository = new UserRepository();
  
    const user = await userRepository.findById(id);
  
    if (!user.isAdmin) {
      throw new AppError('User is not admin');
    }
  
    return next();
  }
  
  export { ensureAdmin };
  