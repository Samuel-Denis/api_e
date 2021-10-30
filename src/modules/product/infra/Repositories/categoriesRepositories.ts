import { CategoryDTO } from "@modules/product/DTOs/categoryDTO";
import { ICategoriesRepositories } from "@modules/product/IRepositories/ICategoriesRepositories";
import { getRepository, Repository } from "typeorm";
import { Category } from "../typeorm/entities/category";


class CategoriesRepositories implements ICategoriesRepositories {

    private repository: Repository<Category>

    constructor(){
        this.repository = getRepository(Category)
    }
    async create({name, image }: CategoryDTO): Promise<void> {
        const category = this.repository.create({name, image });

        await this.repository.save(category);
    }

    async list(): Promise<Category[]>{
        return await this.repository.find()
    }

    async findById(id: string): Promise<Category> {
        return await this.repository.findOne(id);
    }

    async findByName(name: string): Promise<Category> {
        return await this.repository.findOne({name});
    }

}

export { CategoriesRepositories }