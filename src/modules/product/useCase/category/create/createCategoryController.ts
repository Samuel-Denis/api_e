import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateCategoryUseCase } from './createCategoryUseCase'

class CreateCategoryController {
    async handler(req: Request, res: Response): Promise<Response> {
        const { name } = req.body
        const image = req.file.filename

        const createCategoryUseCase = container.resolve(CreateCategoryUseCase)

        await createCategoryUseCase.execute({ name, image })

        return res.status(201).json({ message : 'Categoria criada com sucesso!!'})
    }
}

export { CreateCategoryController }