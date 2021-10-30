import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListarCarrinhoUseCase } from './listarCarrinhoUseCase'
class ListarCarrinhoController {
    async handler(req: Request, res: Response): Promise<Response> {
        const user = req.user

        const listarCarrinhoUseCase = container.resolve(ListarCarrinhoUseCase)

        const response = await listarCarrinhoUseCase.execute(user.id)

        return res.status(201).json(response)

    }
}

export { ListarCarrinhoController }