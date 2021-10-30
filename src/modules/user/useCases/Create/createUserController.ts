import { Request, Response} from 'express';
import { container } from 'tsyringe';
import { CreateUserUseCase } from './createUserUseCase';

class CreateUserController {
    async handler(req: Request, res: Response): Promise<Response> {
        const { name, email, password } = req.body;

        const createUserUseCase = container.resolve(CreateUserUseCase);

        await createUserUseCase.execute({
            name,
            password,
            email,
        });

        return res.status(201).json();
    }
}

export { CreateUserController }