/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router, type Request, type Response } from 'express'
import { middleware } from '../../middlewares'
import { myProfileController } from '../../controllers/myProfile'

const router = Router()

router.get(
  '/',
  middleware.useAuthorization,
  async (req: Request, res: Response) => await myProfileController.find(req, res)
)

router.patch(
  '/',
  middleware.useAuthorization,
  async (req: Request, res: Response) => await myProfileController.update(req, res)
)

export default router
