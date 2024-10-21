import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { validateRequest } from '../../utilities/validateRequest'
import { ResponseData } from '../../utilities/response'
import logger from '../../utilities/logger'
import { updateTokoSchema } from '../../schemas/tokoSchema'
import { TokoModel } from '../../models/tokoModel'

export const updateToko = async (req: any, res: Response): Promise<Response> => {
  const { error, value } = validateRequest(updateTokoSchema, {
    ...req.body
  })

  if (error != null) {
    const message = `Invalid request body! ${error.details.map((x) => x.message).join(', ')}`
    logger.warn(message)
    return res.status(StatusCodes.BAD_REQUEST).json(ResponseData.error(message))
  }

  try {
    const [updated] = await TokoModel.update(value, {
      where: { deleted: 0, tokoId: value.tokoId }
    })

    if (updated === 0) {
      const message = `tokoId not found with ID: ${value.tokoId}`
      logger.warn(message)
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error(message))
    }

    const response = ResponseData.success({ message: 'tokoId updated successfully' })
    logger.info('tokoId updated successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `Unable to process request! Error: ${error.message}`
    logger.error(message, { stack: error.stack })
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ResponseData.error(message))
  }
}
