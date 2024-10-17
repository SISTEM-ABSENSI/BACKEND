import jwt from 'jsonwebtoken'
import { APP_CONFIGS } from '../configs'

export interface JwtPayloadTypes {
  userId: string
}

export const generateAccessToken = (userId: JwtPayloadTypes): any => {
  return jwt.sign(userId, APP_CONFIGS.secret.token ?? '')
}

export const verifyAccessToken = (token: string): any => {
  try {
    return jwt.verify(token, APP_CONFIGS.secret.token ?? '')
  } catch {
    return false
  }
}
