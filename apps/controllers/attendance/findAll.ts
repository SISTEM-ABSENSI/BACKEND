import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { validateRequest } from '../../utilities/validateRequest'
import { ResponseData } from '../../utilities/response'
import logger from '../../utilities/logger'
import { Pagination } from '../../utilities/pagination'
import { findAllScheduleSchema } from '../../schemas/scheduleSchema'
import { ScheduleModel } from '../../models/scheduleModel'
import { StoreModel } from '../../models/storeModel'
import { Op, Sequelize } from 'sequelize'
import { UserModel } from '../../models/user'
import { AttendanceHistoryModel } from '../../models/attendanceHistoryModel'

export const findAllAttendance = async (req: any, res: Response): Promise<Response> => {
  const { error, value } = validateRequest(findAllScheduleSchema, req.query)

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
      search,
      startDate,
      endDate
    } = value

    const page = new Pagination(parseInt(queryPage) ?? 0, parseInt(querySize) ?? 10)

    const dateFilter =
      startDate && endDate
        ? {
            createdAt: {
              [Op.between]: [new Date(startDate), new Date(endDate)]
            }
          }
        : {}

    const result = await ScheduleModel.findAndCountAll({
      where: {
        deleted: 0,
        ...(Boolean(req.body?.jwtPayload?.userRole === 'user') && {
          scheduleUserId: req.body?.jwtPayload?.userId
        }),
        [Op.or]: [{ scheduleStatus: 'checkin' }, { scheduleStatus: 'checkout' }],
        ...dateFilter
      },
      include: [
        {
          model: StoreModel,
          as: 'store',
          attributes: [
            'storeId',
            'storeName',
            'storeAddress',
            'storeLongitude',
            'storeLatitude'
          ]
        },
        {
          model: UserModel,
          as: 'user',
          attributes: ['userId', 'userName', 'userRole', 'userDeviceId', 'userContact'],
          where: search
            ? {
                [Op.or]: [
                  Sequelize.where(Sequelize.col('user.user_name'), 'LIKE', `%${search}%`)
                ]
              }
            : undefined
        },
        {
          model: AttendanceHistoryModel,
          as: 'attendanceHistory',
          attributes: [
            'attendanceHistoryId',
            'attendanceHistoryTime',
            'attendanceHistoryPhoto',
            'attendanceHistoryCategory'
          ]
        }
      ],
      order: [['scheduleId', 'desc']],
      ...(pagination === true && {
        limit: page.limit,
        offset: page.offset
      }),
      distinct: true
    })

    const response = ResponseData.success(result)
    response.data = page.formatData(result)

    logger.info('Attendance records retrieved successfully')
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `Unable to process request! Error: ${error.message}`
    logger.error(message, { stack: error.stack })
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ResponseData.error(message))
  }
}
