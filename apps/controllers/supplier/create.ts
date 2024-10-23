import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { validateRequest } from '../../utilities/validateRequest'
import { ResponseData } from '../../utilities/response'
import logger from '../../utilities/logger'
import { createSupplierSchema } from '../../schemas/supplierSchema'
import { SupplierModel } from '../../models/supplierModel'

export const createSupplier = async (req: any, res: Response): Promise<Response> => {
  const { error, value } = validateRequest(createSupplierSchema, req.body)

  if (error != null) {
    const message = `Invalid request body! ${error.details.map((x) => x.message).join(', ')}`
    logger.warn(message)
    return res.status(StatusCodes.BAD_REQUEST).json(ResponseData.error(message))
  }

  try {
    const product = await SupplierModel.create(value)
    const response = ResponseData.success(product)
    logger.info('Supplier created successfully')
    return res.status(StatusCodes.CREATED).json(response)
  } catch (error: any) {
    const message = `Unable to process request! Error: ${error.message}`
    logger.error(message, { stack: error.stack })
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ResponseData.error(message))
  }
}
