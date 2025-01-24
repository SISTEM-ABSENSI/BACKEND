import { createSchedule } from './create'
import { findAllSchedule } from './findAll'
import { findOneSchedule } from './findOne'
import { removeSchedule } from './remove'
import { updateSchedule } from './update'

export const scheduleControllers = {
  findAll: findAllSchedule,
  findOne: findOneSchedule,
  create: createSchedule,
  update: updateSchedule,
  remove: removeSchedule
}
