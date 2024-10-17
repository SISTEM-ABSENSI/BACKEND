import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { Op } from 'sequelize'
import { validateRequest } from '../../utilities/validateRequest'
import { ResponseData } from '../../utilities/response'
import { UserAttributes, UserModel } from '../../models/user'
import { hashPassword } from '../../utilities/scure_password'
import { generateAccessToken } from '../../utilities/jwt'
import { userLoginSchema } from '../../schemas/user'
import logger from '../../utilities/logger'

export const userLogin = async (req: Request, res: Response): Promise<Response> => {
  const { error, value } = validateRequest(userLoginSchema, req.body)

  if (error) {
    const message = `Invalid request parameter! ${error.details.map((x) => x.message).join(', ')}`
    logger.warn(message)
    return res.status(StatusCodes.BAD_REQUEST).json(ResponseData.error(message))
  }

  const { userName, userPassword } = value as UserAttributes

  try {
    const user = await UserModel.findOne({
      where: {
        deleted: 0,
        userName: userName
      }
    })

    if (!user) {
      const message = 'Account not found. Please register first!'
      logger.info(`Login attempt failed: ${message}`)
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error(message))
    }

    const isPasswordValid = hashPassword(userPassword) === user.userPassword
    if (!isPasswordValid) {
      const message = 'Invalid email and password combination!'
      logger.info(`Login attempt failed: ${message}`)
      return res.status(StatusCodes.UNAUTHORIZED).json(ResponseData.error(message))
    }

    const token = generateAccessToken({ userId: user.userId })
    logger.info(`User ${userName} logged in successfully`)
    return res.status(StatusCodes.OK).json(ResponseData.success({ token }))
  } catch (error: any) {
    const message = `Unable to process request! Error: ${error.message}`
    logger.error(message, { stack: error.stack })
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ResponseData.error(message))
  }
}
