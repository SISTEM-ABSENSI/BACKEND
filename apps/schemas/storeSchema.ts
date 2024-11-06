import Joi from 'joi'

export const createStoreSchema = Joi.object({
  storeName: Joi.string().max(100).required(),
  storeLongitude: Joi.string().max(100).required(),
  storeLatitude: Joi.string().max(100).required(),
  createdAt: Joi.date().optional()
})

export const updateStoreSchema = Joi.object({
  storeId: Joi.number().integer().positive().required(),
  storeName: Joi.string().max(100).optional(),
  storeLongitude: Joi.string().max(100).optional(),
  storeLatitude: Joi.string().max(100).optional(),
  updatedAt: Joi.date().optional()
})

export const deleteStoreSchema = Joi.object({
  storeId: Joi.number().integer().positive().required()
})

export const findOneStoreSchema = Joi.object({
  storeId: Joi.number().integer().positive().required()
})

export const findAllStoreSchema = Joi.object({
  page: Joi.number().integer().optional(),
  size: Joi.number().integer().optional(),
  search: Joi.string().allow('').optional(),
  pagination: Joi.boolean().optional()
})
