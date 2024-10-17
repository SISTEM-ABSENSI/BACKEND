import { APP_CONFIGS } from '../configs'

export interface ResponseDataAttributes {
  requestParam: any | null
  status: 'success' | 'error'
  errorMessage: any | null
  data: any
  next: any | null
  version: {
    code: string
    name: string
  }
}

export const ResponseData = {
  error: (message?: any): ResponseDataAttributes => {
    return {
      requestParam: null,
      status: 'error',
      errorMessage: message,
      data: null,
      next: null,
      version: { code: APP_CONFIGS.appVersion, name: APP_CONFIGS.appSemantic }
    }
  },

  success: (data: any = null, next: any = null): ResponseDataAttributes => {
    return {
      requestParam: null,
      status: 'success',
      errorMessage: null,
      data,
      next,
      version: { code: APP_CONFIGS.appVersion, name: APP_CONFIGS.appSemantic }
    }
  }
}
