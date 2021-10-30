import { Request, Response } from 'express'
import { container } from "tsyringe"
import { ListAllProductsCategoriesUseCase } from './listAllProductsCategoriesUseCase';


class ListAllProductsCategorieController {
    async handler( req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const productsListUseCase = container.resolve(ListAllProductsCategoriesUseCase);

        const all = await productsListUseCase.execute(id);

        return res.json(all)
    }

}

export { ListAllProductsCategorieController }