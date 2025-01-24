import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Op } from 'sequelize'
import { UserModel } from '../../models/user'
import logger from '../../utilities/logger'

export const findMyProfile = async (req: any, res: Response): Promise<any> => {
  try {
    const result = await UserModel.findOne({
      where: {
        deleted: { [Op.eq]: 0 },
        userId: { [Op.eq]: req.body?.jwtPayload?.userId }
      },
      attributes: [
        'userId',
        'userName',
        'userRole',
        'userContact',
        'createdAt',
        'updatedAt'
      ]
    })

    if (result == null) {
      const message = 'user not found!'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.NOT_FOUND).json(response)
    }

    const response = ResponseData.success(result)
    logger.info('User found successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    console.log(error.message)
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
