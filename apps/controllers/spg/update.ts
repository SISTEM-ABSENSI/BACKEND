import { Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { validateRequest } from '../../utilities/validateRequest'
import { ResponseData } from '../../utilities/response'
import logger from '../../utilities/logger'
import { updateSpgSchema } from '../../schemas/spgSchema'
import { SpgModel } from '../../models/spgModel'

export const updateSpg = async (req: any, res: Response): Promise<Response> => {
  const { error, value } = validateRequest(updateSpgSchema, {
    ...req.body
  })

  if (error) {
    const message = `Invalid request body! ${error.details.map((x) => x.message).join(', ')}`
    logger.warn(message)
    return res.status(StatusCodes.BAD_REQUEST).json(ResponseData.error(message))
  }

  try {
    const [updated] = await SpgModel.update(value, {
      where: { deleted: 0, spgId: value.spgId }
    })

    if (!updated) {
      const message = `spgId not found with ID: ${value.spgId}`
      logger.warn(message)
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error(message))
    }

    const response = ResponseData.success({ message: 'spgId updated successfully' })
    logger.info('spgId updated successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `Unable to process request! Error: ${error.message}`
    logger.error(message, { stack: error.stack })
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ResponseData.error(message))
  }
}
