/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type NextFunction, type Request, type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../utilities/response'
import { verifyAccessToken } from '../utilities/jwt'

export const useAuthorization = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  try {
    if (
      req.headers.authorization == null ||
      !req.headers.authorization.startsWith('Bearer ')
    ) {
      const message = 'Missing Authorization.'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.BAD_REQUEST).json(response)
    }

    const token = req.headers.authorization.split(' ')[1]
    const verify = verifyAccessToken(token)

    if (!verify) {
      const message = 'Invalid Authorization.'
      const response = ResponseData.error(message)
      return res.status(StatusCodes.UNAUTHORIZED).json(response)
    }

    req.body.user = verify
    next()
  } catch (error: any) {
    const message = `unable to process request! error ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
