import { createStore } from './create'
import { findAllStore } from './findAll'
import { findOneStore } from './findOne'
import { removeStore } from './remove'
import { updateStore } from './update'

export const storeControllers = {
  findAll: findAllStore,
  findOne: findOneStore,
  create: createStore,
  update: updateStore,
  remove: removeStore
}
