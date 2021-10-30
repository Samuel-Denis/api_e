import { ICarrinhoDTO } from "../DTOs/carrinhoDTO";
import { Cart } from "../infra/typeorm/entities/cart";

interface ICartRepositories {
    create(data: ICarrinhoDTO): Promise<Cart>
    findByUserId(user_id: string): Promise<Cart>
    removeCartUser(user_id: string): Promise<void>
}

export { ICartRepositories }