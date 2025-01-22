import { Router, type Request, type Response } from 'express'
import { authController } from '../../controllers/auth'

const router = Router()

router.post(
  '/login',
  async (req: Request, res: Response) => await authController.login(req, res)
)

router.post(
  '/register',
  async (req: Request, res: Response) => await authController.register(req, res)
)

export default router
