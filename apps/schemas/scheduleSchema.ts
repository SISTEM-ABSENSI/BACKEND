import Joi from 'joi'
import { jwtPayloadSchema } from './jwtPayloadSchema'

export const createScheduleSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  scheduleName: Joi.string().max(100).required(), // Validasi nama schedule
  scheduleDescription: Joi.string().required(), // Validasi deskripsi schedule
  scheduleStoreId: Joi.number().integer().positive().required(), // Foreign key ke Store
  scheduleUserId: Joi.number().integer().positive().required(),
  scheduleStartDate: Joi.date().optional(), // Tanggal mulai opsional
  scheduleEndDate: Joi.date().optional(), // Tanggal selesai opsional
  scheduleStatus: Joi.string().valid('waiting', 'checkin', 'checkout').optional(), // Status dengan pilihan tertentu
  createdAt: Joi.date().optional()
})

export const updateScheduleSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  scheduleId: Joi.number().integer().positive().required(), // ID wajib untuk update
  scheduleName: Joi.string().allow('').max(100).optional(),
  scheduleDescription: Joi.string().allow('').optional(),
  scheduleStoreId: Joi.number().allow('').integer().positive().optional(),
  scheduleUserId: Joi.number().allow('').integer().positive().optional(),
  scheduleStartDate: Joi.date().allow('').optional(),
  scheduleEndDate: Joi.date().allow('').optional(),
  scheduleStatus: Joi.string().allow('').valid('waiting', 'checkin', 'checkout').optional(),
  updatedAt: Joi.date().optional()
})

export const deleteScheduleSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  scheduleId: Joi.number().integer().positive().required() // Wajib untuk menghapus
})

export const findOneScheduleSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  scheduleId: Joi.number().integer().positive().required()
})

export const findAllScheduleSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  page: Joi.number().integer().optional(),
  size: Joi.number().integer().optional(),
  search: Joi.string().allow('').optional(),
  pagination: Joi.boolean().optional()
})
