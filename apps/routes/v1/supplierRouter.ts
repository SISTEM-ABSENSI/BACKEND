/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { middleware } from '../../middlewares'
import { supplierController } from '../../controllers/supplier'

const router = Router()

router.get('/', supplierController.findAll)
router.get('/spg', middleware.useAuthorization, supplierController.findSpg)

export default router
