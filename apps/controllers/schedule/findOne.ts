import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { validateRequest } from '../../utilities/validateRequest'
import { ResponseData } from '../../utilities/response'
import logger from '../../utilities/logger'
import { ScheduleModel } from '../../models/scheduleModel'
import { StoreModel } from '../../models/storeModel'
import { findOneScheduleSchema } from '../../schemas/scheduleSchema'

export const findOneSchedule = async (req: any, res: Response): Promise<Response> => {
  const { error, value } = validateRequest(findOneScheduleSchema, req.params)

  if (error != null) {
    const message = `Invalid request parameters! ${error.details.map((x) => x.message).join(', ')}`
    logger.warn(message)
    return res.status(StatusCodes.BAD_REQUEST).json(ResponseData.error(message))
  }

  try {
    const result = await ScheduleModel.findOne({
      where: {
        deleted: 0,
        scheduleId: value.scheduleId
      },
      include: {
        model: StoreModel,
        as: 'store'
      }
    })

    if (result == null) {
      const message = `Schedule not found with ID: ${value.scheduleId}`
      logger.warn(message)
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error(message))
    }

    const response = ResponseData.success(result)
    logger.info('Schedule found successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `Unable to process request! Error: ${error.message}`
    logger.error(message, { stack: error.stack })
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ResponseData.error(message))
  }
}
