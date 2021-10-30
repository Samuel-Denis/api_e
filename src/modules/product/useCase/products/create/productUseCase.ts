import { IProducts } from "@modules/product/DTOs/productsDTO"
import { Product } from "@modules/product/infra/typeorm/entities/Product"
import { ICategoriesRepositories } from "@modules/product/IRepositories/ICategoriesRepositories"
import { IProductRespositories } from "@modules/product/IRepositories/IProductsRepositories"
import { AppError } from "@shared/errors/appError"
import { inject, injectable } from "tsyringe"

@injectable()
class ProductUseCase {

    constructor(
        @inject('ProductsRepositories')
        private productRepository: IProductRespositories,

        @inject('CategoriesRespositories')
        private categoriesRepositories: ICategoriesRepositories,
    ){}

    async execute({
        name,
        valor,
        description,
        estoque,
        type
    }: IProducts, c: string): Promise<Product>{

        const category = await this.categoriesRepositories.findById(c);

        if(!category){
            throw new AppError('Categoria não existe');
        }
        const product = await this.productRepository.findByName(name)

        if(product){
            throw new AppError('Produto já existente')
        }

       return await this.productRepository.create({        
            name,
            valor,
            description,
            estoque,
            type: type.toUpperCase(),
            category,
        })
    }
}

export { ProductUseCase }