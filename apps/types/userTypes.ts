import { type Response, type Request } from 'express'

export interface UserRegistration extends Request {
  userName: string
  userEmail: string
  userPassword: string
  userRole: 'admin' | 'user'
}
