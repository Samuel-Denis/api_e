import { Request, Response } from 'express'
import { container } from "tsyringe"
import { ProductListUseCase } from "./productListUseCase"


class ProductsListController {
    async handler( req: Request, res: Response): Promise<Response> {

        const productsListUseCase = container.resolve(ProductListUseCase);

        const all = await productsListUseCase.execute();

        return res.json(all)
    }

}

export { ProductsListController }