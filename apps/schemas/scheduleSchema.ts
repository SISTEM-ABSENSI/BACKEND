import Joi from 'joi'
import { jwtPayloadSchema } from './jwtPayloadSchema'
import { createTodoListSchema } from './todoListSchema'

export const createScheduleSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  scheduleName: Joi.string().max(100).required(),
  scheduleDescription: Joi.string().required(),
  scheduleStoreId: Joi.number().integer().positive().required(),
  scheduleStartDate: Joi.string().required(),
  scheduleEndDate: Joi.string().required(),
  scheduleStatus: Joi.string().valid('waiting', 'checkin', 'checkout').optional(),
  todoLists: Joi.array().items(createTodoListSchema).required()
})

export const updateScheduleSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  scheduleId: Joi.number().integer().positive().required(),
  scheduleName: Joi.string().allow('').max(100).optional(),
  scheduleDescription: Joi.string().allow('').optional(),
  scheduleStoreId: Joi.number().allow('').integer().positive().optional(),
  scheduleStartDate: Joi.string().required(),
  scheduleEndDate: Joi.string().required(),
  scheduleStatus: Joi.string()
    .allow('')
    .valid('waiting', 'checkin', 'checkout')
    .optional(),
  todoLists: Joi.array().items(createTodoListSchema).optional()
})

export const deleteScheduleSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  scheduleId: Joi.number().integer().positive().required()
})

export const findOneScheduleSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  scheduleId: Joi.number().integer().positive().required()
})

export const findAllScheduleSchema = Joi.object({
  jwtPayload: jwtPayloadSchema,
  page: Joi.number().integer().optional(),
  size: Joi.number().integer().optional(),
  search: Joi.string().allow('').optional(),
  scheduleStatus: Joi.string().allow('').optional(),
  scheduleStatusNot: Joi.string().allow('').optional(),
  pagination: Joi.boolean().optional(),
  startDate: Joi.string().allow('').optional(),
  endDate: Joi.string().allow('').optional()
})
