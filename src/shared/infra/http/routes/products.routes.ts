import { ProductController } from '@modules/product/useCase/products/create/productController';
import { ProductsListController } from '@modules/product/useCase/products/listar/productListController';
import { Router } from 'express'
import multer from 'multer';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAthenticare';
import  uploadConfig from '@config/upload';
import { UpdateImageProductController } from '@modules/product/useCase/products/updateImage/updateImageProductController';
import { ListAllProductsCategorieController } from '@modules/product/useCase/products/listAllProductsCategoris/listAllProductsCategoriesController';


const productsRouters = Router();


const uploadImage = multer(uploadConfig.upload('./tmp/product'));

const productsController = new ProductController();
const productsListController = new ProductsListController()
const updateImageProductController = new UpdateImageProductController()
const listAllProductsCategorieController = new ListAllProductsCategorieController();

productsRouters.post('/create/:id', 
        // ensureAuthenticated, 
        // ensureAdmin,
        productsController.handler
        )

productsRouters.patch('/updateImage/:id', 
        // ensureAuthenticated, 
        // ensureAdmin,
        uploadImage.single('image'),
        updateImageProductController.handler
        )

productsRouters.get('/list', productsListController.handler)

productsRouters.get('/list/:id', listAllProductsCategorieController.handler)


export { productsRouters }