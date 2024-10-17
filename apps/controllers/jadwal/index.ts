import { createJadwal } from './create'
import { findAllJadwal } from './findAll'
import { findOneJadwal } from './findOne'
import { removeJadwal } from './remove'
import { updateJadwal } from './update'

export const jadwalControllers = {
  findAll: findAllJadwal,
  findOne: findOneJadwal,
  create: createJadwal,
  update: updateJadwal,
  remove: removeJadwal
}
