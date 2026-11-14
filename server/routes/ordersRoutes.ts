import express from "express"

import upload from "../middleware/upload.js"
import { authorize, protect } from "../middleware/auth.js"
import { createOrder, getallOrders, getOrder, getOrders, updateOrderStatus } from "../controllers/orderControllers.js"

const OrderRouter=express.Router()

OrderRouter.get('/',protect,getOrders)
OrderRouter.get('/:id',protect,getOrder)
OrderRouter.post('/',protect,createOrder)
OrderRouter.put('/:id/status',protect,authorize("admin"),updateOrderStatus)
OrderRouter.get('/admin/all',protect,authorize("admin"),getallOrders)


export default OrderRouter;