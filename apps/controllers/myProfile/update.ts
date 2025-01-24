import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Op } from 'sequelize'
import logger from '../../utilities/logger'
import { APP_CONFIGS } from '../../configs'
import { UserAttributes, UserModel } from '../../models/user'

export const updateMyProfile = async (req: any, res: Response): Promise<any> => {
  const requestBody = req.body as UserAttributes

  try {
    if ('userPassword' in requestBody) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      requestBody.userPassword = require('crypto')
        .createHash('sha1')
        .update(requestBody.userPassword + APP_CONFIGS.secret.passwordEncryption)
        .digest('hex')
    }

    const newData: UserAttributes | any = {
      ...(requestBody?.userName?.length > 0 && {
        userName: requestBody?.userName
      }),
      ...(requestBody?.userPassword?.length > 0 && {
        userPassword: requestBody?.userPassword
      }),
      ...(requestBody?.userRole?.length > 0 && {
        userRole: requestBody?.userRole
      }),
      ...(requestBody?.userContact?.length > 0 && {
        userContact: requestBody?.userContact
      })
    }

    await UserModel.update(newData, {
      where: {
        deleted: { [Op.eq]: 0 },
        userId: { [Op.eq]: req.body.jwtPayload.userId }
      }
    })

    const response = ResponseData.success({ message: 'Schedule updated successfully' })
    logger.info('Schedule updated successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    console.log(error.message)
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
