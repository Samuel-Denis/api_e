import { CategoryDTO } from "@modules/product/DTOs/categoryDTO";
import { ICategoriesRepositories } from "@modules/product/IRepositories/ICategoriesRepositories";
import { AppError } from "@shared/errors/appError";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateCategoryUseCase {

    constructor(
        @inject('CategoriesRespositories')
        private categoriesRepositories: ICategoriesRepositories,
    ){}

    async execute({name, image, id}: CategoryDTO): Promise<void> {

        const category = await this.categoriesRepositories.findByName(name);

        if(category){
            throw new AppError('Categoria já existente !!')
        }

        await this.categoriesRepositories.create({name, image })
    }
}

export { CreateCategoryUseCase }