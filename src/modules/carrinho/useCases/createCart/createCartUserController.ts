import { Request, Response} from 'express'
import { container } from 'tsyringe'
import { CreateCartUserUseCase } from './createCartUseCase'

class CreateCartController {

    async handler(req: Request, res: Response): Promise<Response> {
        const { id } = req.user

        const { product_id, quantidade } = req.body

        const createPedidoUseCase = container.resolve(CreateCartUserUseCase)

        const response = await createPedidoUseCase.execute({
            quantidade,
            product_id,
            user_id: id
        })


        return res.json(response);
    }
}


export { CreateCartController }