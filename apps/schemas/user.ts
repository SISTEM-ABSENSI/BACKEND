import Joi from 'joi'
import { jwtPayloadSchema } from './jwtPayloadSchema'

export const userLoginSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  userName: Joi.string().required(),
  userPassword: Joi.string().required()
})

export const userRegistrationSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  userName: Joi.string().required(),
  userRole: Joi.string().valid('admin', 'superAdmin', 'spg', 'supplier').required(),
  userPassword: Joi.string().min(6).required(),
  userDeviceId: Joi.string().optional(),
  userContact: Joi.string().optional()
})

export const findAllUsersSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  page: Joi.number().integer().min(0).default(0).optional(),
  size: Joi.number().integer().min(1).default(10).optional(),
  search: Joi.string().allow('').optional(),
  pagination: Joi.boolean().default(true).optional()
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
  userContact: Joi.string().optional()
})

export const updateUserSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  userId: Joi.string().required(),
  userName: Joi.string().min(3).max(30).optional(),
  userPassword: Joi.string().min(6).max(128).optional(),
  userRole: Joi.string().valid('admin', 'superAdmin', 'spg', 'supplier').optional()
})
