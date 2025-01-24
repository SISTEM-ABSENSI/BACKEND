/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { middleware } from '../../middlewares'
import { statisticController } from '../../controllers/statistic'


const router = Router()

router.get('/', middleware.useAuthorization, statisticController.findTotal)

export default router
