/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router, type Request, type Response } from 'express'
import { UsersController } from '../../controllers/auth'
import { middleware } from '../../middlewares'

const router = Router()

router.get(
  '/',
  async (req: Request, res: Response) => await UsersController.findAll(req, res)
)

router.get(
  '/detail/:userId',
  middleware.useAuthorization,
  async (req: Request, res: Response) => await UsersController.findOne(req, res)
)

router.patch(
  '/',
  async (req: Request, res: Response) => await UsersController.update(req, res)
)

router.delete(
  '/',
  async (req: Request, res: Response) => await UsersController.remove(req, res)
)

router.post(
  '/login',
  async (req: Request, res: Response) => await UsersController.login(req, res)
)

router.post(
  '/register',
  async (req: Request, res: Response) => await UsersController.register(req, res)
)

export default router
