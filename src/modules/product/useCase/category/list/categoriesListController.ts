import { Request, Response } from 'express'
import { container } from "tsyringe"
import { CategoriesListUseCase } from './categoriesListUseCase';


class CateogoriesListController {
    async handler( req: Request, res: Response): Promise<Response> {

        const productsListUseCase = container.resolve(CategoriesListUseCase);

        const all = await productsListUseCase.execute();

        return res.json(all)
    }

}

export { CateogoriesListController }