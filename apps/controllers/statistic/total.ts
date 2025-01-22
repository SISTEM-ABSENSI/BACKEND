import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Op } from 'sequelize'
import { UserModel } from '../../models/user'
import { StoreModel } from '../../models/storeModel'
import logger from '../../utilities/logger'

export const findTotal = async (req: any, res: Response): Promise<any> => {
  try {
    const totalUsers = await UserModel.count({
      where: {
        deleted: { [Op.eq]: 0 },
        userRole: 'user'
      }
    })

    const totalAdmins = await UserModel.count({
      where: {
        deleted: { [Op.eq]: 0 },
        userRole: 'admin'
      }
    })

    const totalSuperAdmins = await UserModel.count({
      where: {
        deleted: { [Op.eq]: 0 },
        userRole: 'superadmin'
      }
    })

    const totalStores = await StoreModel.count({
      where: {
        deleted: { [Op.eq]: 0 }
      }
    })

    const response = ResponseData.success({
      totalUsers,
      totalAdmins,
      totalSuperAdmins,
      totalStores
    })

    logger.info('Store found successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
