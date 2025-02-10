import { type Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { validateRequest } from '../../utilities/validateRequest'
import { ResponseData } from '../../utilities/response'
import logger from '../../utilities/logger'
import { ScheduleModel } from '../../models/scheduleModel'
import { createScheduleSchema } from '../../schemas/scheduleSchema'
import { sequelize } from '../../models/index'
import { TodoListModel } from '../../models/todoListModel'

export const createSchedule = async (req: any, res: Response): Promise<Response> => {
  const { error, value } = validateRequest(createScheduleSchema, req.body)

  if (error != null) {
    const message = `Invalid request body! ${error.details.map((x) => x.message).join(', ')}`
    logger.warn(message)
    return res.status(StatusCodes.BAD_REQUEST).json(ResponseData.error(message))
  }

  const transaction = await sequelize.transaction()
  try {
    value.scheduleUserId = req.body?.jwtPayload?.userId
    const schedule = await ScheduleModel.create(value, { transaction })

    const todoLists = req.body.todoLists.map((todo: any) => ({
      ...todo,
      todoListScheduleId: schedule.scheduleId
    }))

    const createdTodoLists = await TodoListModel.bulkCreate(todoLists, { transaction })

    await transaction.commit()
    const response = ResponseData.success({ schedule, todoLists: createdTodoLists })
    logger.info('Schedule and todo lists created successfully')
    return res.status(StatusCodes.CREATED).json(response)
  } catch (error: any) {
    await transaction.rollback()
    const message = `Unable to process request! Error: ${error.message}`
    logger.error(message, { stack: error.stack })
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ResponseData.error(message))
  }
}
