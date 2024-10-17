import Joi from 'joi'

export const createTokoSchema = Joi.object({
  tokoName: Joi.string().max(100).required(),
  tokoPosition: Joi.string().max(100).required(),
  createdAt: Joi.date().optional()
})

export const updateTokoSchema = Joi.object({
  tokoId: Joi.number().integer().positive().required(),
  tokoName: Joi.string().max(100).optional(),
  tokoPosition: Joi.string().max(100).optional(),
  updatedAt: Joi.date().optional()
})

export const deleteTokoSchema = Joi.object({
  tokoId: Joi.number().integer().positive().required()
})

export const findOneTokoSchema = Joi.object({
  tokoId: Joi.number().integer().positive().required()
})

export const findAllTokoSchema = Joi.object({
  page: Joi.number().integer().optional(),
  size: Joi.number().integer().optional(),
  search: Joi.string().optional(),
  pagination: Joi.boolean().optional()
})
