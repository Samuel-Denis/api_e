import { IProducts } from "../DTOs/productsDTO";
import { Product } from "../infra/typeorm/entities/Product";

interface IProductRespositories {
    create(data: IProducts): Promise<Product>
    findByName(name: string): Promise<Product>
    list(): Promise<Product[]>
    listAllProductsIds(ids : string[]): Promise<Product[]>
    findById(id: string): Promise<Product>
    findByCategory(category_id: string): Promise<Product[]>
}


export { IProductRespositories }