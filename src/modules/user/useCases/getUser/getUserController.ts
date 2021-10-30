import { Request, Response } from 'express'
import { container } from 'tsyringe';
import { GetUserUseCase } from './getUserUseCase';

class GetUserController {
    async handler(req: Request, res: Response): Promise<Response>{
        const { id } = req.user;

        const authenticateUseCase = container.resolve(GetUserUseCase);

        const user = await authenticateUseCase.execute(id);

        return res.json(user);
    }

}

export { GetUserController }