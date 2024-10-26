/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Express, type Request, type Response } from 'express'
import { index } from '../../controllers'
import userRoutes from './userRouter'
import scheduleRoutes from './scheduleRouter'
import supplierRoutes from './supplierRouter'
import storeRoutes from './storeRouter'
import attendanceRoutes from './attendanceRouter'

import uploadFileRoutes from './uploadFileRouter'

export const appRouterV1 = (app: Express): void => {
  app.get('/api/v1', async (req: Request, res: Response) => await index(req, res))
  app.use('/api/v1/users', userRoutes)
  app.use('/api/v1/schedules', scheduleRoutes)
  app.use('/api/v1/suppliers', supplierRoutes)
  app.use('/api/v1/stores', storeRoutes)
  app.use('/api/v1/attendances', attendanceRoutes)
  app.use('/api/v1/files', uploadFileRoutes)
}
