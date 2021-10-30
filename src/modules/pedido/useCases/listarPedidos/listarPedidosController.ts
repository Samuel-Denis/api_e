import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListarPedidosUseCase } from './listarPedidosUseCase'
class ListarPedidoController {
    async handler(req: Request, res: Response): Promise<Response> {
        const user = req.user

        const listarPedidoUseCase = container.resolve(ListarPedidosUseCase)

        const response = await listarPedidoUseCase.execute(user.id)

        return res.status(201).json(response)

    }
}

export { ListarPedidoController }