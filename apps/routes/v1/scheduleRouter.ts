/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { scheduleControllers } from '../../controllers/schedule'
import { middleware } from '../../middlewares'

const router = Router()

router.get('/', middleware.useAuthorization, scheduleControllers.findAll)
router.get(
  '/detail/:scheduleId',
  middleware.useAuthorization,
  scheduleControllers.findOne
)
router.post('/', middleware.useAuthorization, scheduleControllers.create)
router.patch('/', middleware.useAuthorization, scheduleControllers.update)
router.delete('/:scheduleId', middleware.useAuthorization, scheduleControllers.remove)

export default router
