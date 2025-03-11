import Joi from 'joi'
import { jwtPayloadSchema } from './jwtPayloadSchema'

export const createStoreSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  storeName: Joi.string().max(100).required(),
  storeAddress: Joi.string().required(),
  storeLongitude: Joi.string().max(100).required(),
  storeLatitude: Joi.string().max(100).required(),
  createdAt: Joi.date().optional()
})

export const updateStoreSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  storeId: Joi.number().integer().positive().required(),
  storeName: Joi.string().allow('').max(100).optional(),
  storeAddress: Joi.string().allow('').required(),
  storeLongitude: Joi.string().allow('').max(100).optional(),
  storeLatitude: Joi.string().allow('').max(100).optional()
})

export const deleteStoreSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  storeId: Joi.number().integer().positive().required()
})

export const findOneStoreSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  storeId: Joi.number().integer().positive().required()
})

export const findAllStoreSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  page: Joi.number().integer().optional(),
  size: Joi.number().integer().optional(),
  search: Joi.string().allow('').optional(),
  pagination: Joi.boolean().optional()
})
