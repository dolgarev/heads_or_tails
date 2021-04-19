import { Meteor } from 'meteor/meteor'
import { ValidationError } from 'meteor/mdg:validation-error'
import generate from 'nanoid-generate'
import PubSub from 'pubsub-js'
import { serializeError } from 'serialize-error'
import stackTrace from 'stack-trace'

const NANOID_LENGTH = 6

export default class BaseService {
  constructor ({
    pubSub = PubSub,
    logger = Meteor.loggers.con,
    errLogger = Meteor.loggers.err
  } = {}) {
    this.pubSub = pubSub
    this.logger = logger
    this.errLogger = errLogger
  }

  __invokeMethod (method, ...args) {
    if (typeof this[method] !== 'function') {
      throw new Error('method-not-exists')
    }

    try {
      const res = this[method](...args)
      this.logger.info(`SERVICE [${this.serviceName}]: `, { method, args, res })

      return Array.isArray(res)
        ? [null, ...res]
        : [null, res]
    } catch (err) {
      const errId = generate.nolookalikes(NANOID_LENGTH)
      const serializedError = serializeError(err)
      const trace = stackTrace.parse(err)

      this.errLogger.debug(err.error ?? err.message, {
        err: serializedError,
        trace,
        errId,
        method,
        args
      })

      let error
      if (err instanceof ValidationError) {
        error = { error: err.error, details: err.details, errId }
      } else if (err instanceof Meteor.Error) {
        error = { error: err.error, reason: err.reason, details: err.details, errId }
      } else {
        error = { error: err.reason ?? err.error ?? err.message, errId }
      }

      this.logger.error(`SERVICE [${this.serviceName}]: `, error)
      return [new Meteor.ApiError(error)]
    }
  }

  __validate (obj, schema) {
    const cleanObject = schema.clean(obj)
    const ctx = schema.newContext()
    ctx.validate(cleanObject)
    if (ctx.isValid()) return cleanObject

    const errors = ctx.validationErrors()
    throw new ValidationError(errors)
  }
}
