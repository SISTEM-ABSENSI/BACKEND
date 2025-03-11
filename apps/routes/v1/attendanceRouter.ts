/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { attendanceController } from '../../controllers/attendance'
import { middleware } from '../../middlewares'

const router = Router()

router.get('/', attendanceController.findAllAttendance)
router.get('/detail/:scheduleId', attendanceController.findOneAttendance)
router.patch('/', middleware.useAuthorization, attendanceController.attendance)

export default router
