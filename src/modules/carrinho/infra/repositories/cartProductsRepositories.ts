import { IProductInCart } from "@modules/carrinho/DTOs/productInCart";
import { ICartProductsRepositories } from "@modules/carrinho/IRepositories/IRepositoriesCartProducts";
import { getRepository, Repository } from "typeorm";
import { CartProducts } from "../typeorm/entities/productsInCart";

class CarProductsRepositories implements ICartProductsRepositories {

    private repository: Repository<CartProducts>

    constructor(){
        this.repository = getRepository(CartProducts)
    }

    async create({
        id,
        cart,
        product,
        quantidade        
    }: IProductInCart): Promise<void> {
        const cartProduct = this.repository.create({
            id,
            cart,
            product,
            quantidade,
        })
        await this.repository.save(cartProduct)
    }


    async list(cart_id: string): Promise<CartProducts[]> {
        const orders = await this.repository.find({ where: {cart_id} })
       return orders
    }

    async findByIdProduct( product_id : string): Promise<CartProducts> {
        const cartP = await this.repository.findOne({
            where: { product_id }
        })

        return cartP;
    }

    async removeItem(product_id: string): Promise<void> {
        await this.repository.delete(product_id)
    }
}

export { CarProductsRepositories }