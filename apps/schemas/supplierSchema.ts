import Joi from 'joi'
import { jwtPayloadSchema } from './jwtPayloadSchema'

export const createSupplierSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  supplierName: Joi.string().max(100).required(),
  supplierContact: Joi.string().max(100).optional(),
  createdAt: Joi.date().optional()
})

export const updateSupplierSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  supplierId: Joi.number().integer().positive().required(),
  supplierName: Joi.string().max(100).optional(),
  supplierContact: Joi.string().max(100).optional(),
  updatedAt: Joi.date().optional()
})

export const deleteSupplierSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  supplierId: Joi.number().integer().positive().required()
})

export const findOneSupplierSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  supplierId: Joi.number().integer().positive().required()
})

export const findAllSuppliersSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  page: Joi.number().integer().optional(),
  size: Joi.number().integer().optional(),
  search: Joi.string().allow('').optional(),
  pagination: Joi.boolean().optional()
})
