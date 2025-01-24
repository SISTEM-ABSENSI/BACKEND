import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { validateRequest } from '../../utilities/validateRequest'
import { ResponseData } from '../../utilities/response'
import logger from '../../utilities/logger'
import { deleteStoreSchema } from '../../schemas/storeSchema'
import { StoreModel } from '../../models/storeModel'

export const removeStore = async (req: any, res: Response): Promise<Response> => {
  const { error, value } = validateRequest(deleteStoreSchema, req.params)

  if (error != null) {
    const message = `Invalid request parameters! ${error.details.map((x) => x.message).join(', ')}`
    logger.warn(message)
    return res.status(StatusCodes.BAD_REQUEST).json(ResponseData.error(message))
  }

  try {
    const result = await StoreModel.findOne({
      where: {
        deleted: 0,
        storeId: value.storeId
      }
    })

    if (result == null) {
      const message = `Store not found with ID: ${value.storeId}`
      logger.warn(message)
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error(message))
    }

    result.deleted = 1
    await result.save()

    const response = ResponseData.success({ message: 'Store deleted successfully' })
    logger.info('Store deleted successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `Unable to process request! Error: ${error.message}`
    logger.error(message, { stack: error.stack })
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ResponseData.error(message))
  }
}
