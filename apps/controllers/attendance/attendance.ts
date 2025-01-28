/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { validateRequest } from '../../utilities/validateRequest'
import { ResponseData } from '../../utilities/response'
import logger from '../../utilities/logger'
import { updateAttendanceSchema } from '../../schemas/attendanceSchema'
import { ScheduleModel } from '../../models/scheduleModel'
import {
  AttendanceHistoryAttributes,
  AttendanceHistoryModel
} from '../../models/attendanceHistoryModel'
import moment from 'moment'

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
    const scheduleRecord = await ScheduleModel.findOne({
      where: { deleted: 0, scheduleId: value.attendanceId }
    })

    if (!scheduleRecord) {
      const message = 'Attendance record not found'
      logger.warn(message)
      return res.status(StatusCodes.NOT_FOUND).json(ResponseData.error(message))
    }

    const currentTime = moment()
    const startDate = moment(scheduleRecord.scheduleStartDate)
    const endDate = moment(scheduleRecord.scheduleEndDate)

    // Check if trying to check in before start date
    if (currentTime.isBefore(startDate)) {
      const message = 'Cannot check in before scheduled start time'
      logger.warn(message)
      return res.status(StatusCodes.BAD_REQUEST).json(ResponseData.error(message))
    }

    let newStatus: 'checkin' | 'checkout' | 'outside' | null = null

    // Check if past end date
    if (currentTime.isAfter(endDate)) {
      newStatus = 'outside'
    } else {
      if (scheduleRecord.scheduleStatus === 'waiting') {
        newStatus = 'checkin'
      } else if (scheduleRecord.scheduleStatus === 'checkin') {
        newStatus = 'checkout'
      }
    }

    if (!newStatus) {
      const message = 'Invalid status transition'
      logger.warn(message)
      return res.status(StatusCodes.BAD_REQUEST).json(ResponseData.error(message))
    }

    await ScheduleModel.update(
      { ...value, scheduleStatus: newStatus },
      {
        where: { deleted: 0, scheduleId: value.attendanceId }
      }
    )

    const attendanceHistoryPayload: AttendanceHistoryAttributes | any = {
      attendanceHistoryTime: currentTime.format('YYYY-MM-DD HH:mm:ss'),
      attendanceHistoryCategory: newStatus,
      attendanceHistoryUserId: scheduleRecord.scheduleUserId,
      attendanceHistoryPhoto: value.attendancePhoto,
      attendanceHistoryScheduleId: value.attendanceId
    }

    await AttendanceHistoryModel.create(attendanceHistoryPayload)

    const response = ResponseData.success({
      message: `Attendance updated to ${newStatus} successfully`
    })
    logger.info(`Attendance updated to ${newStatus} successfully`)
    return res.status(StatusCodes.OK).json(response)
  } catch (error: any) {
    const message = `Unable to process request! Error: ${error.message}`
    logger.error(message, { stack: error.stack })
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ResponseData.error(message))
  }
}
