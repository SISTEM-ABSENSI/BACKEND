import Joi from 'joi'

export const createJadwalSchema = Joi.object({
  tokoId: Joi.number().integer().positive().required(),
  spgId: Joi.number().integer().positive().required(),
  date: Joi.date().required(),
  checkIn: Joi.date().optional(),
  checkOut: Joi.date().optional(),
  createdAt: Joi.date().optional()
})

export const updateJadwalSchema = Joi.object({
  jadwalId: Joi.number().integer().positive().required(),
  tokoId: Joi.number().integer().positive().optional(),
  spgId: Joi.number().integer().positive().optional(),
  date: Joi.date().optional(),
  checkIn: Joi.date().optional(),
  checkOut: Joi.date().optional(),
  updatedAt: Joi.date().optional()
})

export const deleteJadwalSchema = Joi.object({
  jadwalId: Joi.number().integer().positive().required()
})

export const findOneJadwalSchema = Joi.object({
  jadwalId: Joi.number().integer().positive().required()
})

export const findAllJadwalSchema = Joi.object({
  page: Joi.number().integer().optional(),
  size: Joi.number().integer().optional(),
  search: Joi.string().optional(),
  pagination: Joi.boolean().optional()
})
