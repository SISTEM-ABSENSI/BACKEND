import { Router, type Request, type Response } from 'express'
import { middleware } from '../../middlewares'
import { adminController } from '../../controllers/admin'

const router = Router()

router.get(
  '/',
  middleware.useAuthorization,
  async (req: Request, res: Response) => await adminController.findAll(req, res)
)

router.get(
  '/detail/:userId',
  middleware.useAuthorization,
  async (req: Request, res: Response) => await adminController.findOne(req, res)
)

router.patch(
  '/',
  middleware.useAuthorization,
  async (req: Request, res: Response) => await adminController.update(req, res)
)

router.delete(
  '/',
  middleware.useAuthorization,
  async (req: Request, res: Response) => await adminController.remove(req, res)
)

export default router
