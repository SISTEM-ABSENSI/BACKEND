import { type Request, type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ResponseData } from '../utilities/response'

export const index = async (req: Request, res: Response): Promise<Response> => {
  try {
    const data = {
      about_me: 'Welcome to Sistem Absensi API V1'
    }
    const response = ResponseData.success(data)
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `Unable to process request! Error: ${error.message}`
    const response = ResponseData.error(message)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response)
  }
}
