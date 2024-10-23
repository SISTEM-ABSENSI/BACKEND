import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { validateRequest } from '../../utilities/validateRequest'
import { ResponseData } from '../../utilities/response'
import logger from '../../utilities/logger'
import { JadwalModel } from '../../models/jadwal'
import { updateAttendanceSchema } from '../../schemas/attendanceSchema'
import { TokoModel } from '../../models/tokoModel'

export const attendance = async (req: any, res: Response): Promise<Response> => {
  const { error, value } = validateRequest(updateAttendanceSchema, {
    ...req.body
  })

  if (error != null) {
    const message = `Invalid request body! ${error.details.map((x) => x.message).join(', ')}`
    logger.warn(message)
    return res.status(StatusCodes.BAD_REQUEST).json(ResponseData.error(message))
  }

  try {
    const result = await JadwalModel.findOne({
      where: {
        deleted: 0,
        jadwalId: value.attendanceId
      },
      include: {
        model: TokoModel,
        as: 'toko'
      }
    })

    console.log(result)

    await JadwalModel.update(value, {
      where: { deleted: 0, jadwalId: value.attendanceId }
    })

    // const [updated] = await JadwalModel.update(value, {
    //   where: { deleted: 0, jadwalId: value.attendanceId }
    // })

    // if (updated === 0) {
    //   const message = `Attendance not found with ID: ${value.attendanceId}`
    //   logger.warn(message)
    //   return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error(message))
    // }

    const response = ResponseData.success({ message: 'Attendance updated successfully' })
    logger.info('Attendance updated successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `Unable to process request! Error: ${error.message}`
    logger.error(message, { stack: error.stack })
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ResponseData.error(message))
  }
}
