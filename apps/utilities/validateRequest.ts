import { ObjectSchema, ValidationResult } from 'joi'

export const validateRequest = (
  schema: ObjectSchema,
  requestData: Record<string, any>
): ValidationResult => {
  return schema.validate(requestData, { abortEarly: false })
}
