import { ICartRepositories } from "@modules/carrinho/IRepositories/IRepositoriesCart";
import { ICartProductsRepositories } from "@modules/carrinho/IRepositories/IRepositoriesCartProducts";
import { Product } from "@modules/product/infra/typeorm/entities/Product";
import { IProductRespositories } from "@modules/product/IRepositories/IProductsRepositories";
import { AppError } from "@shared/errors/appError";
import { inject, injectable } from "tsyringe";

interface IResponse {
    id: string,
    product: Product,
    quantidade: number
}

interface IRes {
    products : IResponse [],
    valor : number
}
@injectable()
class ListarCarrinhoUseCase {
    
    constructor(
        @inject('CartRepositories')
        private cartsRepositories: ICartRepositories,
        @inject('CarProductsRepositories')
        private cartProductsRepositories: ICartProductsRepositories,
        @inject('ProductsRepositories')
        private productRepository: IProductRespositories
    ){}
    async execute(user_id: string): Promise<IRes> {
        console.log(user_id)
        const carrinho = await this.cartsRepositories.findByUserId(user_id)
        console.log('Passou')
        if(!carrinho){
            throw new AppError('Carrinho vazio')
        }
        
        const listCarProducts = await this.cartProductsRepositories.list(carrinho.id)
        
        if(!listCarProducts){
            throw new AppError('Carrinho vazio')
        }
        
        const newCart: IResponse[] = [];
        let valor = 0;
        
        for(let i = 0; i < listCarProducts.length; i++){
            
            const prod = await this.productRepository.findById(listCarProducts[i].product_id)
            
            const p: IResponse = {
                id: listCarProducts[i].id,
                product : prod,
                quantidade : listCarProducts[i].quantidade
               }   
                valor += prod.valor * listCarProducts[i].quantidade          
                newCart.push(p)
        }

        const res: IRes = {
            products: newCart,
            valor: valor
        }
        
        return res;
    }
}

export { ListarCarrinhoUseCase }