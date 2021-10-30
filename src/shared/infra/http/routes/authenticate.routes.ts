import { AuthenticateController } from '@modules/user/useCases/authenticate/autenticateController'
import { Router } from 'express'

const authenticateRoutes = Router()

const authenticateController = new AuthenticateController()

authenticateRoutes.post('/', authenticateController.handler)


export { authenticateRoutes }