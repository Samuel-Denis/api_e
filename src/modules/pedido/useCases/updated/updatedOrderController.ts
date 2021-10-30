import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdatedOrderUseCase } from './updatedOrderUseCase'
class UpdatedOrderController {
    async handler(req: Request, res: Response): Promise<Response> {
        const { status } = req.body
        const { num_pedido } = req.params


        const listarPedidoUseCase = container.resolve(UpdatedOrderUseCase)

        const response = await listarPedidoUseCase.execute({
            num: status,
            num_pedido
        })

        return res.status(201).json(response)

    }
}

export { UpdatedOrderController }