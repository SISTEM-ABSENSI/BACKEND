import Joi from 'joi'

export const updateAttendanceSchema = Joi.object({
  attendanceId: Joi.number().integer().positive().required()
})

export const findOneAttendanceSchema = Joi.object({
  attendanceId: Joi.number().integer().positive().required()
})

export const findAllAttendanceSchema = Joi.object({
  page: Joi.number().integer().optional(),
  size: Joi.number().integer().optional(),
  search: Joi.string().optional(),
  pagination: Joi.boolean().optional()
})
