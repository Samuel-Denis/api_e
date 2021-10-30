import {  Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateImageProductUseCase } from './updateImageProductUseCase'

class UpdateImageProductController {

    async handler(req: Request, res: Response): Promise<Response> {
        const { id } = req.params
        const imageName = req.file.filename

        const updateImageProductUseCase = container.resolve(UpdateImageProductUseCase)

        await updateImageProductUseCase.execute({id, imageName})

        return  res.status(201).json({ message : 'operação foi um sucesso'})
    }
}

export { UpdateImageProductController }