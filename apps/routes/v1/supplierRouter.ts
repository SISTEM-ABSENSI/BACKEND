import { Router } from 'express'
import { supplierControllers } from '../../controllers/supplier'

const router = Router()

router.get('/', supplierControllers.findAll)
router.get('/detail/:supplierId', supplierControllers.findOne)
router.post('/', supplierControllers.create)
router.put('/', supplierControllers.update)
router.delete('/:supplierId', supplierControllers.remove)

export default router
