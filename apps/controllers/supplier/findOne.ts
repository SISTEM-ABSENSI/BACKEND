import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { validateRequest } from '../../utilities/validateRequest'
import { ResponseData } from '../../utilities/response'
import logger from '../../utilities/logger'
import { findOneSupplierSchema } from '../../schemas/supplierSchema'
import { SupplierModel } from '../../models/supplierModel'

export const findOneSupplier = async (req: any, res: Response): Promise<Response> => {
  const { error, value } = validateRequest(findOneSupplierSchema, req.params)

  if (error != null) {
    const message = `Invalid request parameters! ${error.details.map((x) => x.message).join(', ')}`
    logger.warn(message)
    return res.status(StatusCodes.BAD_REQUEST).json(ResponseData.error(message))
  }

  try {
    const result = await SupplierModel.findOne({
      where: {
        deleted: 0,
        supplierId: value.supplierId
      }
    })

    if (result == null) {
      const message = `Supplier not found with ID: ${value.supplierId}`
      logger.warn(message)
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error(message))
    }

    const response = ResponseData.success(result)
    logger.info('Supplier found successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `Unable to process request! Error: ${error.message}`
    logger.error(message, { stack: error.stack })
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ResponseData.error(message))
  }
}
