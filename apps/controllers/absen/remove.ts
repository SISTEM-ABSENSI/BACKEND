import { Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { validateRequest } from '../../utilities/validateRequest'
import { ResponseData } from '../../utilities/response'
import logger from '../../utilities/logger'
import { deleteAbsenSchema } from '../../schemas/absenSchema'
import { AbsenModel } from '../../models/absenModel'

export const removeAbsen = async (req: any, res: Response): Promise<Response> => {
  const { error, value } = validateRequest(deleteAbsenSchema, req.params)

  if (error) {
    const message = `Invalid request parameters! ${error.details.map((x) => x.message).join(', ')}`
    logger.warn(message)
    return res.status(StatusCodes.BAD_REQUEST).json(ResponseData.error(message))
  }

  try {
    const result = await AbsenModel.findOne({
      where: {
        deleted: 0,
        absenId: value.absenId
      }
    })

    if (!result) {
      const message = `Absen not found with ID: ${value.absenId}`
      logger.warn(message)
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error(message))
    }

    result.deleted = 1
    void result.save()

    const response = ResponseData.success({ message: 'Absen deleted successfully' })
    logger.info('Absen deleted successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `Unable to process request! Error: ${error.message}`
    logger.error(message, { stack: error.stack })
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ResponseData.error(message))
  }
}
