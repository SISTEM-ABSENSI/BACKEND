import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { validateRequest } from '../../utilities/validateRequest'
import { ResponseData } from '../../utilities/response'
import logger from '../../utilities/logger'
import { createTokoSchema } from '../../schemas/tokoSchema'
import { TokoModel } from '../../models/tokoModel'

export const createToko = async (req: any, res: Response): Promise<Response> => {
  const { error, value } = validateRequest(createTokoSchema, req.body)

  if (error != null) {
    const message = `Invalid request body! ${error.details.map((x) => x.message).join(', ')}`
    logger.warn(message)
    return res.status(StatusCodes.BAD_REQUEST).json(ResponseData.error(message))
  }

  try {
    const product = await TokoModel.create(value)
    const response = ResponseData.success(product)
    logger.info('Toko created successfully')
    return res.status(StatusCodes.CREATED).json(response)
  } catch (error: any) {
    const message = `Unable to process request! Error: ${error.message}`
    logger.error(message, { stack: error.stack })
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ResponseData.error(message))
  }
}
