import { IOrderProductsDTO } from '@modules/pedido/DTOs/ordersProductsDTO'
import { Request, Response} from 'express'
import { container } from 'tsyringe'
import { CreatePedidoUseCase } from './createPedidoUseCase'


interface IRequest {
    orderProducts: IOrderProductsDTO[]
}

class CreatePedidoController {

    async handler(req: Request, res: Response): Promise<Response> {
        const user_id: string = req.user.id

        const { entrega } = req.body;

        const createPedidoUseCase = container.resolve(CreatePedidoUseCase)

        const response = await createPedidoUseCase.execute({user_id, is_entrega: entrega})


        return res.json(response);
    }
}


export { CreatePedidoController }