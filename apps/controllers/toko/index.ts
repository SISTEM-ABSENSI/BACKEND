import { createToko } from './create'
import { findAllToko } from './findAll'
import { findOneToko } from './findOne'
import { removeToko } from './remove'
import { updateToko } from './update'

export const tokoControllers = {
  findAll: findAllToko,
  findOne: findOneToko,
  create: createToko,
  update: updateToko,
  remove: removeToko
}
