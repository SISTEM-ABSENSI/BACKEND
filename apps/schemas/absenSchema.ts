import Joi from 'joi'

export const createAbsenSchema = Joi.object({
  spgId: Joi.number().integer().positive().required(),
  tokoId: Joi.number().integer().positive().required(),
  position: Joi.string().max(100).optional(),
  checkIn: Joi.date().optional(),
  checkOut: Joi.date().optional(),
  createdAt: Joi.date().optional()
})

export const updateAbsenSchema = Joi.object({
  absenId: Joi.number().integer().positive().required(),
  spgId: Joi.number().integer().positive().optional(),
  tokoId: Joi.number().integer().positive().optional(),
  position: Joi.string().max(100).optional(),
  checkIn: Joi.date().optional(),
  checkOut: Joi.date().optional(),
  updatedAt: Joi.date().optional()
})

export const deleteAbsenSchema = Joi.object({
  absenId: Joi.number().integer().positive().required()
})

export const findOneAbsenSchema = Joi.object({
  absenId: Joi.number().integer().positive().required()
})

export const findAllAbsenSchema = Joi.object({
  page: Joi.number().integer().optional(),
  size: Joi.number().integer().optional(),
  search: Joi.string().optional(),
  pagination: Joi.boolean().optional()
})
