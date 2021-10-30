import { Product } from "@modules/product/infra/typeorm/entities/Product";

interface IOrderProductsDTO {
    id?: string;
    pedido_id: string;
    product: Product;
    quantidade: number;
    valor?: number;
}

export { IOrderProductsDTO }