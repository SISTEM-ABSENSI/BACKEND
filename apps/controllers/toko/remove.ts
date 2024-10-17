import { Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { validateRequest } from '../../utilities/validateRequest'
import { ResponseData } from '../../utilities/response'
import logger from '../../utilities/logger'
import { deleteSpgSchema } from '../../schemas/spgSchema'
import { SpgModel } from '../../models/spgModel'

export const removeToko = async (req: any, res: Response): Promise<Response> => {
  const { error, value } = validateRequest(deleteSpgSchema, req.params)

  if (error) {
    const message = `Invalid request parameters! ${error.details.map((x) => x.message).join(', ')}`
    logger.warn(message)
    return res.status(StatusCodes.BAD_REQUEST).json(ResponseData.error(message))
  }

  try {
    const result = await SpgModel.findOne({
      where: {
        deleted: 0,
        spgId: value.spgId
      }
    })

    if (!result) {
      const message = `spg not found with ID: ${value.spgId}`
      logger.warn(message)
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error(message))
    }

    result.deleted = 1
    void result.save()

    const response = ResponseData.success({ message: 'spg deleted successfully' })
    logger.info('spg deleted successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `Unable to process request! Error: ${error.message}`
    logger.error(message, { stack: error.stack })
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ResponseData.error(message))
  }
}
