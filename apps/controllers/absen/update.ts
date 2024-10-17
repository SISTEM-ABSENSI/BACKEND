import { Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { validateRequest } from '../../utilities/validateRequest'
import { ResponseData } from '../../utilities/response'
import logger from '../../utilities/logger'
import { updateAbsenSchema } from '../../schemas/absenSchema'
import { AbsenModel } from '../../models/absenModel'

export const updateAbsen = async (req: any, res: Response): Promise<Response> => {
  const { error, value } = validateRequest(updateAbsenSchema, {
    ...req.body
  })

  if (error) {
    const message = `Invalid request body! ${error.details.map((x) => x.message).join(', ')}`
    logger.warn(message)
    return res.status(StatusCodes.BAD_REQUEST).json(ResponseData.error(message))
  }

  try {
    const [updated] = await AbsenModel.update(value, {
      where: { deleted: 0, absenId: value.absenId }
    })

    if (!updated) {
      const message = `Absen not found with ID: ${value.absenId}`
      logger.warn(message)
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error(message))
    }

    const response = ResponseData.success({ message: 'Absen updated successfully' })
    logger.info('Absen updated successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `Unable to process request! Error: ${error.message}`
    logger.error(message, { stack: error.stack })
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ResponseData.error(message))
  }
}
