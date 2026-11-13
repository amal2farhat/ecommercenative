import express from "express"

import upload from "../middleware/upload.js"
import { authorize, protect } from "../middleware/auth.js"
import { addToCart, clearCart, getCart, removeCartItem, updateCartItem } from "../controllers/cartControllers.js"

const CartRouter=express.Router()

CartRouter.get('/',protect,getCart)
CartRouter.post('/add',protect,addToCart)
CartRouter.put('/item/:productId',protect,updateCartItem)
CartRouter.delete('/item/:productId',protect,removeCartItem)
CartRouter.delete('/',protect,clearCart)


export default CartRouter;