import { createAbsen } from './create'
import { findAllAbsen } from './findAll'
import { findOneAbsen } from './findOne'
import { removeAbsen } from './remove'
import { updateAbsen } from './update'

export const absenControllers = {
  findAll: findAllAbsen,
  findOne: findOneAbsen,
  create: createAbsen,
  update: updateAbsen,
  remove: removeAbsen
}
