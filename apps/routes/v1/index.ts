import { Express, Request, Response } from 'express'
import { index } from '../../controllers'
import userRoutes from './userRouter'
import absenRoutes from './absenRouter'
import jadwalRoutes from './jadwalRouter'
import spgRoutes from './spgRouter'
import supplierRoutes from './supplierRouter'
import tokoRoutes from './tokoRouter'

import uploadFileRoutes from './uploadFileRouter'

export const appRouterV1 = (app: Express): void => {
  app.get(`/api/v1`, async (req: Request, res: Response) => await index(req, res))
  app.use(`/api/v1/absens`, absenRoutes)
  app.use(`/api/v1/users`, userRoutes)
  app.use(`/api/v1/jadwal`, jadwalRoutes)
  app.use(`/api/v1/spg`, spgRoutes)
  app.use(`/api/v1/suppliers`, supplierRoutes)
  app.use(`/api/v1/toko`, tokoRoutes)
  app.use(`/api/v1/files`, uploadFileRoutes)
}
