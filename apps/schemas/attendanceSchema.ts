import Joi from 'joi'
import { jwtPayloadSchema } from './jwtPayloadSchema'

export const updateAttendanceSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  attendanceId: Joi.number().integer().positive().required()
})

export const findOneAttendanceSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  attendanceId: Joi.number().integer().positive().required()
})

export const findAllAttendanceSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  page: Joi.number().integer().optional(),
  size: Joi.number().integer().optional(),
  search: Joi.string().allow('').optional(),
  pagination: Joi.boolean().optional(),
  startDate: Joi.string().allow('').optional(),
  endDate: Joi.string().allow('').optional()
})
