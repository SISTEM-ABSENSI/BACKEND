import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Op } from 'sequelize'
import { UserModel } from '../../models/user'
import { SupplierModel } from '../../models/supplierModel'
import { StoreModel } from '../../models/storeModel'
import logger from '../../utilities/logger'

export const findTotal = async (req: any, res: Response): Promise<any> => {
  try {
    const totalUsers = await UserModel.count({
      where: {
        deleted: { [Op.eq]: 0 }
      }
    })

    const totalSuppliers = await SupplierModel.count({
      where: {
        deleted: { [Op.eq]: 0 }
      }
    })

    const totalSpg = await UserModel.count({
      where: {
        deleted: { [Op.eq]: 0 },
        userRole: 'spg'
      }
    })
    
    const totalStores = await StoreModel.count({
      where: {
        deleted: { [Op.eq]: 0 }
      }
    })

    const response = ResponseData.success({
      totalUsers,
      totalStores,
      totalSpg,
      totalSuppliers
    })

    logger.info('Store found successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
