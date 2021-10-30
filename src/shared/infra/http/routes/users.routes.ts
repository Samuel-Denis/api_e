import { Router } from "express";
import { CreateUserController } from "@modules/user/useCases/Create/createUserController";
import { UpdateUserAvatarController } from "@modules/user/useCases/updateAvatar/updateUserAvatarController";

import uploadConfig from '@config/upload';
import multer from "multer";
import { ensureAuthenticated } from "../middlewares/ensureAthenticare";
import { GetUserController } from "@modules/user/useCases/getUser/getUserController";
const usersRoutes = Router();

const userControler = new CreateUserController()
const updateAvatar = new UpdateUserAvatarController();
const getUser = new GetUserController();
const uploadAvatar = multer(uploadConfig.upload('/avatar'));


usersRoutes.post('', userControler.handler)

usersRoutes.post(
    '/avatar',
    uploadAvatar.single('avatar'),
    ensureAuthenticated, 
    updateAvatar.handle
);

usersRoutes.get(
    '/',
    ensureAuthenticated,
    getUser.handler);

export { usersRoutes };
