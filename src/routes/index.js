import express from 'express'
import routerProduct from "./product.js";
import routerAuth from "./auth.js";
import routerImages from "./upload.js";



const router = express.Router()

router.use('/product', routerProduct)
router.use('/auth', routerAuth)
router.use('/images', routerImages)



export default router