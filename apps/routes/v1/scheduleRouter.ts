/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { scheduleControllers } from '../../controllers/schedule'

const router = Router()

router.get('/', scheduleControllers.findAll)
router.get('/detail/:scheduleId', scheduleControllers.findOne)
router.post('/', scheduleControllers.create)
router.patch('/', scheduleControllers.update)
router.delete('/:scheduleId', scheduleControllers.remove)

export default router
