import { useAuthorization } from './access'
import { uploadMiddleware } from './upload-file'

export const middleware = { useAuthorization, uploadMiddleware }
