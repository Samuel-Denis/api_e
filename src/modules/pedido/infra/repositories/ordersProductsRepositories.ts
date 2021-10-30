import { IOrderProductsDTO } from "@modules/pedido/DTOs/ordersProductsDTO";
import { IOrdersPedidosRepositories } from "@modules/pedido/IRepositories/IOrdersProductsRepositories";
import { getRepository, Repository } from "typeorm";
import { OrderProducts } from "../typeorm/entities/ordersProducts";

class OrdersProductsRepositories implements IOrdersPedidosRepositories {

    private repository: Repository<OrderProducts>

    constructor(){
        this.repository = getRepository(OrderProducts)
    }

    async create({
        id,
        pedido_id,
        quantidade,
        valor,
        product
    }: IOrderProductsDTO): Promise<void> {
        const orderProduct = this.repository.create({
            id,
            pedido_id,
            product,
            quantidade,
            valor
        })

        await this.repository.save(orderProduct)
    }


    async list(pedido_id: string): Promise<OrderProducts[]> {
        const orders = await this.repository.find({ pedido_id })

       return orders
    }

    async findById(id: string): Promise<OrderProducts> {
        return await this.repository.findOne(id)
    }
}

export { OrdersProductsRepositories }