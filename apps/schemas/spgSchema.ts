import Joi from 'joi'

export const createSpgSchema = Joi.object({
  spgName: Joi.string().max(100).required(),
  spgDeviceId: Joi.string().max(100).required(),
  spgContact: Joi.string().max(100).optional(),
  spgSupplierId: Joi.number().integer().positive().required(),
  spgPassword: Joi.string().required(),
  createdAt: Joi.date().optional()
})

export const updateSpgSchema = Joi.object({
  spgId: Joi.number().integer().positive().required(),
  spgName: Joi.string().max(100).optional(),
  spgDeviceId: Joi.string().max(100).optional(),
  spgContact: Joi.string().max(100).optional(),
  spgSupplierId: Joi.number().integer().positive().optional(),
  spgPassword: Joi.string().optional(),
  updatedAt: Joi.date().optional()
})

export const deleteSpgSchema = Joi.object({
  spgId: Joi.number().integer().positive().required()
})

export const findOneSpgSchema = Joi.object({
  spgId: Joi.number().integer().positive().required()
})

export const findAllSpgSchema = Joi.object({
  page: Joi.number().integer().optional(),
  size: Joi.number().integer().optional(),
  search: Joi.string().optional(),
  pagination: Joi.boolean().optional()
})
