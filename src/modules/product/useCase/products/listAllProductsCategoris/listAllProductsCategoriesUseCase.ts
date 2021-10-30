import { Category } from "@modules/product/infra/typeorm/entities/category";
import { Product } from "@modules/product/infra/typeorm/entities/Product";
import { IProductRespositories } from "@modules/product/IRepositories/IProductsRepositories";
import { inject, injectable } from "tsyringe";

@injectable()
class ListAllProductsCategoriesUseCase {
    constructor(
        @inject('ProductsRepositories')
        private productsRepositories: IProductRespositories,
    ){}

    async execute(category_id: string): Promise<Product[]>{
        const products = await this.productsRepositories.findByCategory(category_id);

        for(var i = 0; i < products.length; i++){
            products[i].image = products[i].image
        }

        return products;
    }
}

export { ListAllProductsCategoriesUseCase }