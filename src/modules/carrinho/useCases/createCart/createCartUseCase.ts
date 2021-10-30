import { ICarrinhoDTO } from "@modules/carrinho/DTOs/carrinhoDTO";
import { IProductInCart } from "@modules/carrinho/DTOs/productInCart";
import { ICartRepositories } from "@modules/carrinho/IRepositories/IRepositoriesCart";
import { ICartProductsRepositories } from "@modules/carrinho/IRepositories/IRepositoriesCartProducts";
import { IProductRespositories } from "@modules/product/IRepositories/IProductsRepositories";
import { AppError } from "@shared/errors/appError";
import { inject, injectable } from "tsyringe";

interface IRequest {
    product_id: string;
    quantidade: number;
    user_id : string
}

interface IResponse {
    cart: ICarrinhoDTO,
    cartProducts: IProductInCart[]
}

@injectable()
class CreateCartUserUseCase {

    constructor(
        @inject('CartRepositories')
        private cartsRepositories: ICartRepositories,
        @inject('CarProductsRepositories')
        private cartProductsRepositories: ICartProductsRepositories,
        @inject('ProductsRepositories')
        private productRepository: IProductRespositories
    ){}

     async execute({user_id, quantidade, product_id}: IRequest): Promise<IResponse>{

        if(quantidade <= 0){
            throw new AppError('quantidade não permitida')
        }

        const product = await this.productRepository.findById(product_id)

        if(!product){
            throw new AppError('Produto não encontrado !!!')
        }
        
        if(product.estoque < quantidade){
            throw new AppError('Estoque insuficiente')
        }
        
       const cartUserExists = await this.cartsRepositories.findByUserId(user_id);
       
       if(!cartUserExists){
        await this.cartsRepositories.create({user_id})
       }
       
        const cartUser =  await this.cartsRepositories.findByUserId(user_id)


        const pCart = await this.cartProductsRepositories.findByIdProduct(product.id)

        if(pCart && product.type == 'UNID'){
          pCart.quantidade += quantidade
          if(product.estoque < pCart.quantidade){
            throw new AppError('Não foi possivel adicionar o item, estoque insuficiente')
        }
          await this.cartProductsRepositories.create(pCart)
          
        } else {
           await this.cartProductsRepositories.create({
               cart: cartUser,
               product : product,
               quantidade
           })
         }

         const listProductsOrder = await this.cartProductsRepositories.list(cartUser.id)


         const response : IResponse = {
          cart: cartUser,
          cartProducts: listProductsOrder
      }

      return response
}
}

export { CreateCartUserUseCase }