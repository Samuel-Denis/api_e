import { Product } from "@modules/product/infra/typeorm/entities/Product";
import { IProductRespositories } from "@modules/product/IRepositories/IProductsRepositories";
import { inject, injectable } from "tsyringe";

interface Response {
    
}
@injectable()
class ProductListUseCase {

    constructor(
        @inject('ProductsRepositories')
        private productsRepositories: IProductRespositories,
    ){}

   async execute():Promise<Product[]> {

        const products = await this.productsRepositories.list();

        for(var i = 0; i < products.length; i++){
            products[i].image = products[i].image
        }

        return products;

   }
}

export { ProductListUseCase }