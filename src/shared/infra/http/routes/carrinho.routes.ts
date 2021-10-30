import { CreateCartController } from '@modules/carrinho/useCases/createCart/createCartUserController';
import { ListarCarrinhoController } from '@modules/carrinho/useCases/list/listarCarrinhoController';
import { RemoveItemDoCarrinhoController } from '@modules/carrinho/useCases/removerItemDoCarrinho/removerItemDoCarrinhoController';
import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAthenticare';

const cartRouters = Router()


const createCartController = new CreateCartController()
const listarCarrinhoController = new ListarCarrinhoController()
const removeItemDoCarrinhoController = new RemoveItemDoCarrinhoController()

cartRouters.post(
    '/',
    ensureAuthenticated,
    createCartController.handler);

cartRouters.get(
    '/',
    ensureAuthenticated,
    listarCarrinhoController.handler
    )

cartRouters.delete('/',
    ensureAuthenticated,
    removeItemDoCarrinhoController.handler
)



export { cartRouters }