import { IOrderProductsDTO } from "@modules/pedido/DTOs/ordersProductsDTO";
import { IPedidosDTO } from "@modules/pedido/DTOs/pedidoDTO";
import { IOrdersPedidosRepositories } from "@modules/pedido/IRepositories/IOrdersProductsRepositories";
import { IPedidosRepositories } from "@modules/pedido/IRepositories/IPedidosRepositories";
import { IProductRespositories } from "@modules/product/IRepositories/IProductsRepositories";
import { inject, injectable } from "tsyringe";

interface IResponseProduct{
    name: string;
    quantidade: number;
    valor: number;
    image: string;
    type : string;
}
interface IResponse {
    order: IPedidosDTO,
    orderProducts: IResponseProduct []
}

@injectable()
class ListarPedidosUseCase {
    
    constructor(
        @inject('PedidosRepositories')
        private pedidosRepositories: IPedidosRepositories,
        @inject('OrdersProductsRepositories')
        private ordersProductsRepositories: IOrdersPedidosRepositories,
        @inject('ProductsRepositories')
        private productRepository: IProductRespositories,
    ){}
    async execute(user_id: string): Promise<IResponse[]> {

        const pedido = await this.pedidosRepositories.list(user_id)

        const newPedido: IResponse[] = []
        

        for(let i = 0; i < pedido.length; i++){
            const productResponse: IResponseProduct[] = []
            const orderProducts = await this.ordersProductsRepositories.list(pedido[i].id)


        for(let j = 0; j < orderProducts.length; j++){
            const product = await this.productRepository.findById(orderProducts[j].product_id)

            const e : IResponseProduct = {
                name: product.name,
                quantidade: orderProducts[j].quantidade,
                valor: orderProducts[j].valor,
                image: product.image,
                type: product.type
            
            }

            productResponse.push(e)
        }

            
           const p: IResponse = {
            order : pedido[i],
            orderProducts : productResponse
           }
            
            newPedido.push(p)
        }

        return newPedido
    }
}

export { ListarPedidosUseCase }