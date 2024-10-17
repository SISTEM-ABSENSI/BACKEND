import Joi from 'joi'

export const createSupplierSchema = Joi.object({
  supplierName: Joi.string().max(100).required(),
  supplierContact: Joi.string().max(100).optional(),
  createdAt: Joi.date().optional()
})

export const updateSupplierSchema = Joi.object({
  supplierId: Joi.number().integer().positive().required(),
  supplierName: Joi.string().max(100).optional(),
  supplierContact: Joi.string().max(100).optional(),
  updatedAt: Joi.date().optional()
})

export const deleteSupplierSchema = Joi.object({
  supplierId: Joi.number().integer().positive().required()
})

export const findOneSupplierSchema = Joi.object({
  supplierId: Joi.number().integer().positive().required()
})

export const findAllSuppliersSchema = Joi.object({
  page: Joi.number().integer().optional(),
  size: Joi.number().integer().optional(),
  search: Joi.string().optional(),
  pagination: Joi.boolean().optional()
})
