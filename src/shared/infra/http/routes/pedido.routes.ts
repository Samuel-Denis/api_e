import { CreatePedidoController } from '@modules/pedido/useCases/createPedido/createPedidoController'
import { ListarPedidoController } from '@modules/pedido/useCases/listarPedidos/listarPedidosController';
import { UpdatedOrderController } from '@modules/pedido/useCases/updated/updatedOrderController';
import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAthenticare';

const pedidoRouters = Router()


const createPedidoController = new CreatePedidoController()
const listarPedidoController = new ListarPedidoController()
const updatedOrderController = new UpdatedOrderController()

pedidoRouters.post(
    '/',
    ensureAuthenticated,
    createPedidoController.handler);

pedidoRouters.get(
    '/',
    ensureAuthenticated,
    listarPedidoController.handler
    )
pedidoRouters.post(
        '/updated/:num_pedido',
        ensureAuthenticated,
        updatedOrderController
        .handler
        )


export { pedidoRouters }