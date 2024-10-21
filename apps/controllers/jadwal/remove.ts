import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { validateRequest } from '../../utilities/validateRequest'
import { ResponseData } from '../../utilities/response'
import logger from '../../utilities/logger'
import { deleteJadwalSchema } from '../../schemas/jadwalSchema'
import { JadwalModel } from '../../models/jadwal'

export const removeJadwal = async (req: any, res: Response): Promise<Response> => {
  const { error, value } = validateRequest(deleteJadwalSchema, req.params)

  if (error != null) {
    const message = `Invalid request parameters! ${error.details.map((x) => x.message).join(', ')}`
    logger.warn(message)
    return res.status(StatusCodes.BAD_REQUEST).json(ResponseData.error(message))
  }

  try {
    const result = await JadwalModel.findOne({
      where: {
        deleted: 0,
        jadwalId: value.jadwalId
      }
    })

    if (result == null) {
      const message = `Jadwal not found with ID: ${value.jadwalId}`
      logger.warn(message)
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error(message))
    }

    result.deleted = 1
    void result.save()

    const response = ResponseData.success({ message: 'Jadwal deleted successfully' })
    logger.info('Jadwal deleted successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `Unable to process request! Error: ${error.message}`
    logger.error(message, { stack: error.stack })
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ResponseData.error(message))
  }
}
