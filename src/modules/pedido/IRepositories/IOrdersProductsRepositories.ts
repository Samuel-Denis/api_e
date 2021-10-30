import { IOrderProductsDTO } from "../DTOs/ordersProductsDTO";
import { OrderProducts } from "../infra/typeorm/entities/ordersProducts";

interface IOrdersPedidosRepositories {
    create(data: IOrderProductsDTO): Promise<void>
    list(pedido_id: string): Promise<OrderProducts[]>
    findById(id: string): Promise<OrderProducts>
}

export { IOrdersPedidosRepositories }