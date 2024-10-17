// controller.ts
import { Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { Op } from 'sequelize'
import { validateRequest } from '../../utilities/validateRequest'
import { ResponseData } from '../../utilities/response'
import { UserModel } from '../../models/user'
import { Pagination } from '../../utilities/pagination'
import { findAllUsersSchema, findOneUserSchema } from '../../schemas/user'
import logger from '../../utilities/logger'

export const findAllUser = async (req: any, res: Response): Promise<Response> => {
  const { error, value } = validateRequest(findAllUsersSchema, req.query)

  if (error) {
    const message = `Invalid query parameter! ${error.details.map((x) => x.message).join(', ')}`
    logger.warn(message)
    return res.status(StatusCodes.BAD_REQUEST).json(ResponseData.error(message))
  }

  const { page: queryPage, size: querySize, search, pagination } = value

  try {
    const page = new Pagination(parseInt(queryPage) ?? 0, parseInt(querySize) ?? 10)

    const users = await UserModel.findAndCountAll({
      where: {
        deleted: { [Op.eq]: 0 },
        userId: { [Op.not]: req.body?.user?.userId },
        ...(Boolean(search) && {
          [Op.or]: [{ userName: { [Op.like]: `%${search}%` } }]
        })
      },
      attributes: ['userId', 'userId', 'userName', 'userRole', 'createdAt', 'updatedAt'],
      order: [['userId', 'desc']],
      ...(pagination === 'true' && {
        limit: page.limit,
        offset: page.offset
      })
    })

    const response = ResponseData.success(page.formatData(users))
    logger.info('Fetched all users successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `Unable to process request! Error: ${error.message}`
    logger.error(message, { stack: error.stack })
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ResponseData.error(message))
  }
}

export const findOneUser = async (req: any, res: Response): Promise<Response> => {
  const { error, value } = validateRequest(findOneUserSchema, req.params)

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
      },
      attributes: ['userId', 'userName', 'createdAt', 'updatedAt']
    })

    if (!user) {
      const message = 'User not found!'
      logger.info(message)
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error(message))
    }

    const response = ResponseData.success(user)
    logger.info(`Fetched user with ID: ${userId} successfully`)
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `Unable to process request! Error: ${error.message}`
    logger.error(message, { stack: error.stack })
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ResponseData.error(message))
  }
}
