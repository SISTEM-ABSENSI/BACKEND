import { Router, type Request, type Response } from 'express'

import { middleware } from '../../middlewares'
import { userController } from '../../controllers/users'

const router = Router()

router.get(
  '/',
  middleware.useAuthorization,
  async (req: Request, res: Response) => await userController.findAll(req, res)
)

router.get(
  '/detail/:userId',
  middleware.useAuthorization,
  async (req: Request, res: Response) => await userController.findOne(req, res)
)

export default router
