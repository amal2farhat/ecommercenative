import express from "express"
import { createProduct, deleteProduct, getProduct, getProductById, getProducts, updateProduct } from "../controllers/productController.js"
import upload from "../middleware/upload.js"
import { authorize, protect } from "../middleware/auth.js"

const ProductRouter=express.Router()

ProductRouter.get('/',getProduct)
ProductRouter.get('/:id',getProducts)
ProductRouter.get('/:id',getProductById)

ProductRouter.post('/',upload.array("images",5),protect,authorize("admin"),createProduct)

ProductRouter.put('/:id',upload.array("images",5),protect,authorize("admin"),updateProduct)
ProductRouter.delete('/:id',protect,authorize("admin"),deleteProduct)

export default ProductRouter;