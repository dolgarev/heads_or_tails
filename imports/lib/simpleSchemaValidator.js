export default class SimpleSchemaValidator {
  static validateObject (obj, schema, cleanOptions) {
    const cleanObject = schema.clean(obj, cleanOptions)
    const ctx = schema.newContext()
    ctx.validate(cleanObject)

    const errors = (
      ctx.isValid() ? [] : ctx.validationErrors()
    ).map(error => ({
      ...error,
      err: ctx.keyErrorMessage(error.name)
    }))

    return [new Map(errors.map(err => [err.name, err])), cleanObject]
  }
}
