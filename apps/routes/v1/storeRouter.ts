/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { storeControllers } from '../../controllers/store'

const router = Router()

router.get('/', storeControllers.findAll)
router.get('/detail/:storeId', storeControllers.findOne)
router.post('/', storeControllers.create)
router.put('/', storeControllers.update)
router.delete('/:storeId', storeControllers.remove)

export default router
