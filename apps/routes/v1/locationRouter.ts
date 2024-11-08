/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { middleware } from '../../middlewares'
import { locationController } from '../../controllers/location'

const router = Router()

router.get('/', locationController.findAllAttendance)


export default router
