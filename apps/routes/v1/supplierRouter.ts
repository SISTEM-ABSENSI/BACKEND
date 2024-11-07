/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { supplierControllers } from '../../controllers/supplier'
import { middleware } from '../../middlewares'

const router = Router()

router.get('/', middleware.useAuthorization, supplierControllers.findAll)
router.get(
  '/detail/:supplierId',
  middleware.useAuthorization,
  supplierControllers.findOne
)
router.post('/', middleware.useAuthorization, supplierControllers.create)
router.patch('/', middleware.useAuthorization, supplierControllers.update)
router.delete('/:supplierId', middleware.useAuthorization, supplierControllers.remove)

export default router
