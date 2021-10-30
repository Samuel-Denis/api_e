import { Product } from "@modules/product/infra/typeorm/entities/Product";
import { Cart } from "../infra/typeorm/entities/cart";

interface IProductInCart {
    id?: string;
    cart: Cart;
    product: Product;
    quantidade: number;
}

export { IProductInCart }