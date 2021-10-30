import { IProductRespositories } from "@modules/product/IRepositories/IProductsRepositories";
import { AppError } from "@shared/errors/appError";
import { inject, injectable } from "tsyringe";


interface IRequest {

    id: string,
    imageName: string
}

@injectable()
class UpdateImageProductUseCase {

    constructor(
        @inject('ProductsRepositories')
        private productsRepositories: IProductRespositories,
    ){}

    async execute({ id, imageName }: IRequest ): Promise<void> {

        const product = await this.productsRepositories.findById(id)

        if(!product){
            throw new AppError('Produto não encontrado !!!')
        }

        product.image = imageName

        await this.productsRepositories.create(product)
    }
}

export { UpdateImageProductUseCase }