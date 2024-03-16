import express from 'express'
import { create, getList, getDetail, remove, update } from '../controllers/products.js'
import { checkPermission } from '../middlewares/checkPermisson.js'

const router = express.Router()

router.get('/', getList)
router.get('/:id', getDetail)
router.post('/', //checkPermission,
 create )
router.put('/:id', checkPermission,  update)
router.delete('/:id', checkPermission, remove)

export default router