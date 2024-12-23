import Joi from 'joi'
import { jwtPayloadSchema } from './jwtPayloadSchema'

export const userLoginSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  userName: Joi.string().required(),
  userPassword: Joi.string().required(),
  userDeviceId: Joi.string().optional().allow('')
})

export const userRegistrationSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  userName: Joi.string().required(),
  userRole: Joi.string().valid('admin', 'superAdmin', 'spg', 'supplier').required(),
  userPassword: Joi.string().min(6).required(),
  userDeviceId: Joi.string().optional().allow(''),
  userContact: Joi.string().optional().allow(''),
  userSupplierId: Joi.number().optional()
})

export const findAllUsersSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  page: Joi.number().integer().min(0).default(0).optional(),
  size: Joi.number().integer().min(1).default(10).optional(),
  userRole: Joi.string().allow('').optional(),
  search: Joi.string().allow('').optional(),
  pagination: Joi.boolean().default(true).optional(),
  userId: Joi.string().optional().allow('')
})

export const findOneUserSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  userId: Joi.string().required()
})

export const userSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  userId: Joi.string().required(),
  userName: Joi.string().min(3).max(30).required(),
  userPassword: Joi.string().min(6).max(128).required(),
  userRole: Joi.string().valid('admin', 'superAdmin', 'spg', 'supplier').required(),
  userDeviceId: Joi.string().optional(),
  userContact: Joi.string().optional(),
  userSupplierId: Joi.number().optional()
})

export const updateUserSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  userId: Joi.string().optional().allow(''),
  userName: Joi.string().allow('').min(3).max(30).optional(),
  userPassword: Joi.string().allow('').min(6).max(128).optional(),
  userContact: Joi.string().allow('').optional(),
  userSupplierId: Joi.number().optional(),
  userRole: Joi.string()
    .allow('')
    .valid('admin', 'superAdmin', 'spg', 'supplier')
    .optional()
})
