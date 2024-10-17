import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../../utilities/response'
import { Op } from 'sequelize'
import { UserModel } from '../../models/user'
import { validateRequest } from '../../utilities/validateRequest'
import { findOneUserSchema } from '../../schemas/user'
import logger from '../../utilities/logger'

export const removeUser = async (req: any, res: Response): Promise<Response> => {
  const { error, value } = validateRequest(findOneUserSchema, req.query)

  if (error) {
    const message = `Invalid request parameter! ${error.details.map((x) => x.message).join(', ')}`
    logger.warn(message)
    return res.status(StatusCodes.BAD_REQUEST).json(ResponseData.error(message))
  }

  const { userId } = value

  try {
    const user = await UserModel.findOne({
      where: {
        deleted: { [Op.eq]: 0 },
        userId: { [Op.eq]: userId }
      }
    })

    if (!user) {
      const message = 'User not found!'
      logger.info(`Attempt to remove non-existing user: ${userId}`)
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error(message))
    }

    user.deleted = 1
    await user.save()
    logger.info(`User ${userId} successfully removed`)

    return res
      .status(StatusCodes.OK)
      .json(ResponseData.success({ message: 'User successfully removed' }))
  } catch (error: any) {
    const message = `Unable to process request! Error: ${error.message}`
    logger.error(message, { stack: error.stack })
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ResponseData.error(message))
  }
}
