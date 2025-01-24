/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { middleware } from '../../middlewares'
import { attendanceHistoryController } from '../../controllers/attendanceHistory'

const router = Router()

router.get('/', middleware.useAuthorization, attendanceHistoryController.findAll)

export default router
