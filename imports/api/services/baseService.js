import { Meteor } from 'meteor/meteor'
import { ValidationError } from 'meteor/mdg:validation-error'
import generate from 'nanoid-generate'
import PubSub from 'pubsub-js'
import { serializeError } from 'serialize-error'
import stackTrace from 'stack-trace'

const NANOID_LENGTH = 6

export default class BaseService {
  constructor ({
    services
  } = {}) {
    this.eventsService = services?.eventsService ?? PubSub
    this.loggerService = services?.loggerService ?? Meteor.loggers.con
    this.errorLoggerService = services?.errorLoggerService ?? Meteor.loggers.err
  }

  __invokeMethod (method, ...args) {
    if (typeof this[method] !== 'function') throw new Error('method-not-exists')

    try {
      const res = Promise.resolve(this[method](...args)).await()
      this.loggerService.info(`SERVICE [${this.serviceName}]: `, { method, args, res })

      return Array.isArray(res) ? [null, ...res] : [null, res]
    } catch (err) {
      const errId = generate.nolookalikes(NANOID_LENGTH)
      const serializedError = serializeError(err)
      const trace = stackTrace.parse(err)

      this.errorLoggerService.debug(err.error ?? err.message, {
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

      this.loggerService.error(`SERVICE [${this.serviceName}]: `, error)
      return [new Meteor.ApiError(error)]
    }
  }
}
