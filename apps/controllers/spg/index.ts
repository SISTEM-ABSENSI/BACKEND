import { createSpg } from './create'
import { findAllSpg } from './findAll'
import { findOneSpg } from './findOne'
import { removeSpg } from './remove'
import { updateSpg } from './update'

export const spgControllers = {
  findAll: findAllSpg,
  findOne: findOneSpg,
  create: createSpg,
  update: updateSpg,
  remove: removeSpg
}
