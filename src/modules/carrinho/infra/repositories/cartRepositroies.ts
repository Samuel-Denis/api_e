import { ICartRepositories } from "@modules/carrinho/IRepositories/IRepositoriesCart";
import { IPedidosDTO } from "@modules/pedido/DTOs/pedidoDTO";
import { getRepository, Repository } from "typeorm";
import { Cart } from "../typeorm/entities/cart";


class CartRepositories implements ICartRepositories {

    private repository: Repository<Cart>;

    constructor(){
        this.repository = getRepository(Cart);
    }

    async create({
        user_id,
        id
    }: IPedidosDTO ): Promise<Cart> {

        const cart = this.repository.create({ id, user_id})

        await this.repository.save(cart);

        return cart;
    }
    async findByUserId(user_id: string): Promise<Cart> {
        return await this.repository.findOne({user_id})
    }

    async removeCartUser(user_id: string): Promise<void>{
        await this.repository.delete({ user_id })
    }
}

export { CartRepositories }