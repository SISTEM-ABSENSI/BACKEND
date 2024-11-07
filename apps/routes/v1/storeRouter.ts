/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { storeControllers } from '../../controllers/store'
import { middleware } from '../../middlewares'

const router = Router()

router.get('/', middleware.useAuthorization, storeControllers.findAll)
router.get('/detail/:storeId', middleware.useAuthorization, storeControllers.findOne)
router.post('/', middleware.useAuthorization, storeControllers.create)
router.patch('/', middleware.useAuthorization, storeControllers.update)
router.delete('/:storeId', middleware.useAuthorization, storeControllers.remove)

export default router
