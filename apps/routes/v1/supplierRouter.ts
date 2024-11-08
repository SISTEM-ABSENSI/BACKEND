/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { middleware } from '../../middlewares'
import { supplierController } from '../../controllers/supplier'

const router = Router()

router.get('/', middleware.useAuthorization, supplierController.findAll)

export default router
