import express from "express"

import upload from "../middleware/upload.js"
import { authorize, protect } from "../middleware/auth.js"
import { getDashboarsStats } from "../controllers/adminControllers.js"

const AdminRouter=express.Router()

AdminRouter.get('/stats',protect,authorize('admin'),getDashboarsStats)


export default AdminRouter;