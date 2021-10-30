import { CreateCategoryController } from "@modules/product/useCase/category/create/createCategoryController";
import { Router } from "express";
import multer from "multer";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAthenticare";
import   uploadConfig from '@config/upload'
import { CateogoriesListController } from "@modules/product/useCase/category/list/categoriesListController";

const categoriesRoutes = Router();

const uploadImage = multer(uploadConfig.upload('./tmp/category'));

const createCategory = new CreateCategoryController();
const categoriesListController = new CateogoriesListController();

categoriesRoutes.post('/',
    // ensureAuthenticated,
    // ensureAdmin,
    uploadImage.single('image'),
    createCategory.handler
    )

    categoriesRoutes.get('/list', categoriesListController.handler)
    
export { categoriesRoutes };
