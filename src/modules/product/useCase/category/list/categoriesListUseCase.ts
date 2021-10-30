import { Category } from "@modules/product/infra/typeorm/entities/category";
import { ICategoriesRepositories } from "@modules/product/IRepositories/ICategoriesRepositories";
import { inject, injectable } from "tsyringe";

@injectable()
class CategoriesListUseCase {
    constructor(
        @inject('CategoriesRespositories')
        private categoriesRepositories: ICategoriesRepositories,
    ){}

    async execute(): Promise<Category[]>{
        const categories = await this.categoriesRepositories.list();

        for(var i = 0; i < categories.length; i++){
            categories[i].image = `tmp/category/${categories[i].image}`
        }

        return categories;
    }
}

export { CategoriesListUseCase }