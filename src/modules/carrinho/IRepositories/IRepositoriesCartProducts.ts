import { IProductInCart } from "../DTOs/productInCart";
import { CartProducts } from "../infra/typeorm/entities/productsInCart";


interface ICartProductsRepositories {
    create(data: IProductInCart): Promise<void>
    list(cart_id: string): Promise<CartProducts[]>
    findByIdProduct(product_id: string): Promise<CartProducts>
    removeItem(product_id: string): Promise<void>
}

export { ICartProductsRepositories }