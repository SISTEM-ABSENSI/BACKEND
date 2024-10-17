import { createSupplier } from './create'
import { findAllSupplier } from './findAll'
import { findOneSupplier } from './findOne'
import { removeSupplier } from './remove'
import { updateSupplier } from './update'

export const supplierControllers = {
  findAll: findAllSupplier,
  findOne: findOneSupplier,
  create: createSupplier,
  update: updateSupplier,
  remove: removeSupplier
}
