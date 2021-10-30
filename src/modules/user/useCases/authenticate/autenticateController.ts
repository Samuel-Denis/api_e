import { Request, Response } from 'express'
import { container } from 'tsyringe';
import { AuthenticateUseCase } from './authenticateUseCase';

class AuthenticateController {
    async handler(req: Request, res: Response): Promise<Response>{
        const { password, email } = req.body;

        const authenticateUseCase = container.resolve(AuthenticateUseCase);

        const token = await authenticateUseCase.execute({email, password})

        return res.json(token);
    }

}

export { AuthenticateController }