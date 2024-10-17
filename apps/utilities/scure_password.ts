/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { APP_CONFIGS } from '../configs'

export function hashPassword(password: string) {
  return require('crypto')
    .createHash('sha1')
    .update(password + APP_CONFIGS.secret.passwordEncryption)
    .digest('hex')
}
