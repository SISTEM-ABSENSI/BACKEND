import Joi from 'joi'
import { jwtPayloadSchema } from './jwtPayloadSchema'

export const attendanceHistorySchema = Joi.object({
  attendanceHistoryId: Joi.number().integer().positive().required(),
  attendanceHistoryUserId: Joi.number().integer().positive().required(),
  attendanceHistoryTime: Joi.string().isoDate().required(),
  attendanceHistoryPhoto: Joi.string().required(),
  attendanceHistoryCategory: Joi.string().valid('checkin', 'checkout').required()
})

export const updateAttendanceHistorySchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  attendanceHistory: attendanceHistorySchema.required()
})

export const findOneAttendanceHistorySchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  attendanceHistoryId: Joi.number().integer().positive().required()
})

export const findAllAttendanceHistoriesSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  page: Joi.number().integer().optional(),
  size: Joi.number().integer().optional(),
  search: Joi.string().allow('').optional(),
  pagination: Joi.boolean().optional(),
  startDate: Joi.string().isoDate().optional(),
  endDate: Joi.string().isoDate().optional(),
  attendanceHistoryUserId: Joi.number().integer().positive().optional().allow('')
})
