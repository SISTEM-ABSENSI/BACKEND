import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { validateRequest } from '../../utilities/validateRequest'
import { ResponseData } from '../../utilities/response'
import logger from '../../utilities/logger'
import { Pagination } from '../../utilities/pagination'
import { findAllAttendanceHistoriesSchema } from '../../schemas/attendanceHistorySchema'
import { AttendanceHistoryModel } from '../../models/attendanceHistoryModel'
import { Op } from 'sequelize'

export const findAll = async (req: any, res: Response): Promise<Response> => {
  const { error, value } = validateRequest(findAllAttendanceHistoriesSchema, req.query)

  if (error != null) {
    const message = `Invalid request query! ${error.details.map((x) => x.message).join(', ')}`
    logger.warn(message)
    return res.status(StatusCodes.BAD_REQUEST).json(ResponseData.error(message))
  }

  try {
    const {
      page: queryPage,
      size: querySize,
      pagination,
      startDate,
      endDate,
      search
    } = value

    const page = new Pagination(parseInt(queryPage) ?? 0, parseInt(querySize) ?? 10)

    const whereConditions: any = {
      deleted: 0,
      ...(Boolean(req.body?.jwtPayload?.userRole === 'user') && {
        attendanceHistoryUserId: req.body?.jwtPayload?.userId
      })
    }

    if (startDate && endDate) {
      whereConditions.attendanceHistoryTime = {
        [Op.between]: [new Date(startDate), new Date(endDate)]
      }
    }

    if (search) {
      whereConditions[Op.or] = [
        { attendanceHistoryCategory: { [Op.like]: `%${search}%` } }
      ]
    }

    const result = await AttendanceHistoryModel.findAndCountAll({
      where: whereConditions,
      attributes: [
        'attendanceHistoryId',
        'attendanceHistoryUserId',
        'attendanceHistoryTime',
        'attendanceHistoryCategory'
      ],
      order: [['attendanceHistoryId', 'desc']],
      ...(pagination === 'true' && {
        limit: page.limit,
        offset: page.offset
      })
    })

    const response = ResponseData.success(result)
    response.data = page.formatData(result)

    logger.info('Attendance history retrieved successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `Unable to process request! Error: ${error.message}`
    logger.error(message, { stack: error.stack })
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ResponseData.error(message))
  }
}
