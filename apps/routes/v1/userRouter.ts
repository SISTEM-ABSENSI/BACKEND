import { Router, Request, Response } from 'express'
import { UsersController } from '../../controllers/auth'
import { middleware } from '../../middlewares'

const router = Router()

router.get('/', async (req: Request, res: Response) => UsersController.findAll(req, res))

router.get(
  '/detail/:userId',
  middleware.useAuthorization,
  async (req: Request, res: Response) => UsersController.findOne(req, res)
)

router.patch('/', async (req: Request, res: Response) => UsersController.update(req, res))

router.delete('/', async (req: Request, res: Response) =>
  UsersController.remove(req, res)
)

router.post('/login', async (req: Request, res: Response) =>
  UsersController.login(req, res)
)

router.post('/register', async (req: Request, res: Response) =>
  UsersController.register(req, res)
)

export default router
