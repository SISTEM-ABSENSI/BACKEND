import { findAllUser, findOneUser } from './find'
import { userLogin } from './login'
import { userRegister } from './register'
import { removeUser } from './remove'
import { updateUser } from './update'

export const UsersController = {
  login: userLogin,
  register: userRegister,
  findAll: findAllUser,
  findOne: findOneUser,
  update: updateUser,
  remove: removeUser
}
