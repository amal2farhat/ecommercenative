import express from "express"

import upload from "../middleware/upload.js"
import { authorize, protect } from "../middleware/auth.js"
import { addAddresses, deleteAddresses, getAddresses, updateAddresses } from "../controllers/addressControllers.js"

const addressRouter=express.Router()

addressRouter.get('/',protect,getAddresses)
addressRouter.post('/',protect,addAddresses)
addressRouter.put('/:id',protect,updateAddresses)
addressRouter.delete('/:id',protect,deleteAddresses)


export default addressRouter;