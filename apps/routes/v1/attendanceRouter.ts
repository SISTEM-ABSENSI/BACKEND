/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { attendanceController } from '../../controllers/attendance'

const router = Router()

router.patch('/', attendanceController.attendance)

export default router
