import Joi from 'joi'

export const userLoginSchema = Joi.object({
  userName: Joi.string().required(),
  userPassword: Joi.string().required()
})

export const userRegistrationSchema = Joi.object({
  userName: Joi.string().required(),
  userEmail: Joi.string().required(),
  userRole: Joi.string().valid('admin', 'user').required(),
  userPassword: Joi.string().min(6).required()
})

export const findAllUsersSchema = Joi.object({
  page: Joi.number().integer().min(0).default(0).optional(),
  size: Joi.number().integer().min(1).default(10).optional(),
  search: Joi.string().allow('').optional(),
  pagination: Joi.boolean().default(true).optional()
})

export const findOneUserSchema = Joi.object({
  userId: Joi.string().required()
})

export const userSchema = Joi.object({
  userId: Joi.string().required(),
  userName: Joi.string().min(3).max(30).required(),
  userPassword: Joi.string().min(6).max(128).required(),
  userRole: Joi.string().valid('admin', 'user').required()
})

export const updateUserSchema = Joi.object({
  userId: Joi.string().required(),
  userName: Joi.string().min(3).max(30).required(),
  userPassword: Joi.string().min(6).max(128).required(),
  userRole: Joi.string().valid('admin', 'user').required()
})
