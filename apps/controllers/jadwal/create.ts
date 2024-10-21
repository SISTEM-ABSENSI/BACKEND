import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { validateRequest } from '../../utilities/validateRequest'
import { ResponseData } from '../../utilities/response'
import logger from '../../utilities/logger'
import { createJadwalSchema } from '../../schemas/jadwalSchema'
import { JadwalModel } from '../../models/jadwal'

export const createJadwal = async (req: any, res: Response): Promise<Response> => {
  const { error, value } = validateRequest(createJadwalSchema, req.body)

  if (error != null) {
    const message = `Invalid request body! ${error.details.map((x) => x.message).join(', ')}`
    logger.warn(message)
    return res.status(StatusCodes.BAD_REQUEST).json(ResponseData.error(message))
  }

  try {
    const jadwal = await JadwalModel.create(value)
    const response = ResponseData.success(jadwal)
    logger.info('Jadwal created successfully')
    return res.status(StatusCodes.CREATED).json(response)
  } catch (error: any) {
    const message = `Unable to process request! Error: ${error.message}`
    logger.error(message, { stack: error.stack })
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ResponseData.error(message))
  }
}
