import Joi from 'joi'

export const createTodoListSchema = Joi.object({
  todoListName: Joi.string().max(100).required(),
  todoListScheduleId: Joi.number().integer().positive().optional().allow(''),
  todoListStatus: Joi.boolean().optional()
})

export const updateTodoListSchema = Joi.object({
  todoListId: Joi.number().integer().positive().required(),
  todoListName: Joi.string().allow('').max(100).optional(),
  todoListScheduleId: Joi.number().allow('').integer().positive().optional(),
  todoListStatus: Joi.boolean().optional()
})

export const deleteTodoListSchema = Joi.object({
  todoListId: Joi.number().integer().positive().required()
})

export const findOneTodoListSchema = Joi.object({
  todoListId: Joi.number().integer().positive().required()
})

export const findAllTodoListSchema = Joi.object({
  page: Joi.number().integer().optional(),
  size: Joi.number().integer().optional(),
  search: Joi.string().allow('').optional(),
  todoListStatus: Joi.string().allow('').optional(),
  pagination: Joi.boolean().optional()
})
