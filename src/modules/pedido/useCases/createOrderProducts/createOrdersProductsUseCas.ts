import { IOrderProductsDTO } from "@modules/pedido/DTOs/ordersProductsDTO";
import { IOrdersPedidosRepositories } from "@modules/pedido/IRepositories/IOrdersProductsRepositories";
import { IProductRespositories } from "@modules/product/IRepositories/IProductsRepositories";
import { AppError } from "@shared/errors/appError";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateOrderProductsUseCase {
   
    constructor(
        @inject('OrdersProductsRepositories')
        private ordersProductsRepositories: IOrdersPedidosRepositories,
        @inject('ProductsRepositories')
        private productRepository: IProductRespositories
    ){}

    async execute(order: IOrderProductsDTO, pedido_id: string) : Promise<void>{
    
        order.pedido_id = pedido_id
        order.valor = order.quantidade * order.product.valor;

       await this.ordersProductsRepositories.create(order)}
}

export { CreateOrderProductsUseCase }