import Joi from 'joi'

export const createScheduleSchema = Joi.object({
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
  scheduleId: Joi.number().integer().positive().required(), // ID wajib untuk update
  scheduleName: Joi.string().max(100).optional(),
  scheduleDescription: Joi.string().optional(),
  scheduleStoreId: Joi.number().integer().positive().optional(),
  scheduleUserId: Joi.number().integer().positive().optional(),
  scheduleStartDate: Joi.date().optional(),
  scheduleEndDate: Joi.date().optional(),
  scheduleStatus: Joi.string().valid('waiting', 'checkin', 'checkout').optional(),
  updatedAt: Joi.date().optional()
})

export const deleteScheduleSchema = Joi.object({
  scheduleId: Joi.number().integer().positive().required() // Wajib untuk menghapus
})

export const findOneScheduleSchema = Joi.object({
  scheduleId: Joi.number().integer().positive().required()
})

export const findAllScheduleSchema = Joi.object({
  page: Joi.number().integer().optional(),
  size: Joi.number().integer().optional(),
  search: Joi.string().allow('').optional(),
  pagination: Joi.boolean().optional()
})
