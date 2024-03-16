import express from 'express'
import routerProducts from "./products.js";
import routerAuth from "./auth.js";
import routerImages from "./upload.js";
import routerCategories from "./categories.js";




const router = express.Router()

router.use('/products', routerProducts)
router.use('/auth', routerAuth)
router.use('/images', routerImages)
router.use('/categories', routerCategories)




export default router