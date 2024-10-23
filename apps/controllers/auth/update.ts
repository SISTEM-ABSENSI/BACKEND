import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Op } from 'sequelize'
import { UserModel, type UserAttributes } from '../../models/user'
import { validateRequest } from '../../utilities/validateRequest'
import { updateUserSchema } from '../../schemas/user'
import { hashPassword } from '../../utilities/scure_password'
import logger from '../../utilities/logger'

export const updateUser = async (req: any, res: Response): Promise<Response> => {
  const { error, value } = validateRequest(updateUserSchema, req.body)

  if (error != null) {
    const message = `Invalid request parameter! ${error.details.map((x) => x.message).join(', ')}`
    logger.warn(message)
    return res.status(StatusCodes.BAD_REQUEST).json(ResponseData.error(message))
  }

  const { userId, userName, userPassword, userRole } = value as UserAttributes

  try {
    const user = await UserModel.findOne({
      where: {
        deleted: { [Op.eq]: 0 },
        userId: { [Op.eq]: userId }
      }
    })

    if (user == null) {
      const message = 'User not found!'
      logger.info(`Attempt to update non-existing user: ${userId}`)
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error(message))
    }

    const updatedData: Partial<UserAttributes> = {
      ...(userName.length > 0 && { userName }),
      ...(userPassword.length > 0 && { userPassword: hashPassword(userPassword) }),
      ...(userRole.length > 0 && { userRole })
    }

    await UserModel.update(updatedData, {
      where: {
        deleted: { [Op.eq]: 0 },
        userId: { [Op.eq]: userId }
      }
    })

    logger.info(`User ${userId} updated successfully`)
    return res
      .status(StatusCodes.OK)
      .json(ResponseData.success({ message: 'User updated successfully' }))
  } catch (error: any) {
    const message = `Unable to process request! Error: ${error.message}`
    logger.error(message, { stack: error.stack })
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ResponseData.error(message))
  }
}
