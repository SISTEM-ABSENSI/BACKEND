/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Express, type Request, type Response } from 'express'
import { index } from '../../controllers'
import userRoutes from './userRouter'
import myProfileRoutes from './myProfileRouter'
import scheduleRoutes from './scheduleRouter'
import storeRoutes from './storeRouter'
import attendanceRoutes from './attendanceRouter'
import statisticRoutes from './statisticRouter'
import locationRoutes from './locationRouter'
import attendanceHistoryRoutes from './attendanceHistoryRouter'
import authRoutes from './authRouter'
import adminRoutes from './adminRouter'

const apiVersion = '/api/v1'

export const appRouterV1 = (app: Express): void => {
  app.get(apiVersion, async (req: Request, res: Response) => await index(req, res))
  app.use(apiVersion + '/users', userRoutes)
  app.use(apiVersion + '/schedules', scheduleRoutes)
  app.use(apiVersion + '/my-profile', myProfileRoutes)
  app.use(apiVersion + '/stores', storeRoutes)
  app.use(apiVersion + '/attendances', attendanceRoutes)
  app.use(apiVersion + '/attendances/histories', attendanceHistoryRoutes)
  app.use(apiVersion + '/statistic', statisticRoutes)
  app.use(apiVersion + '/locations', locationRoutes)
  app.use(apiVersion + '/auth', authRoutes)
  app.use(apiVersion + '/admins', adminRoutes)
}
