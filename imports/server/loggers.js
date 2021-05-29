import { Meteor } from 'meteor/meteor'
import winston from 'winston'
import 'winston-mongodb'
import yn from 'yn'

const DEFAULT_LOGGER = 'console'
const STUB_LOGGER = 'stub'

const {
  TESTAPP_SUPPRESS_WINSTON_LOGGER,
  TESTAPP_ALLOW_WINSTON_MONGODB_TRANSPORT,
  LOG_LEVEL = 'silly'
} = process.env

// [https://github.com/winstonjs/winston#logging]
const LOGGER_LEVEL = LOG_LEVEL

const suppressLogger = yn(TESTAPP_SUPPRESS_WINSTON_LOGGER)
const ignorePrivateFilter = winston.format(info => {
  return info.private
    ? false
    : info
})

function getLogger (envName, logger = DEFAULT_LOGGER) {
  const envvar = process.env[envName]
  const loggerName = winston.loggers.has(logger)
    ? logger
    : STUB_LOGGER
  return winston.loggers.get(yn(envvar) ? STUB_LOGGER : loggerName)
}

const transports = {}

transports.console = new winston.transports.Console({
  label: 'console',
  level: LOGGER_LEVEL
})

winston.loggers.add('console', {
  format: winston.format.combine(
    ignorePrivateFilter(),
    winston.format.colorize(),
    winston.format.splat(),
    winston.format.simple()
  ),
  silent: suppressLogger,
  transports: [
    transports.console
  ].filter(Boolean)
})

winston.loggers.add('stub', {
  silent: true,
  transports: [
    transports.console
  ].filter(Boolean)
})

if (yn(TESTAPP_ALLOW_WINSTON_MONGODB_TRANSPORT)) {
  const mongoURL = process.env.WINSTON_MONGO_URL ?? Meteor.detectMongoUrl()

  transports.errMongodb = new winston.transports.MongoDB({
    collection: 'winston_err_reports',
    db: mongoURL,
    level: LOGGER_LEVEL,
    name: 'mongo',
    storeHost: true,
    decolorize: true
  })

  winston.loggers.add('mongoErrorReports', {
    format: winston.format.combine(
      ignorePrivateFilter(),
      winston.format.splat(),
      winston.format.metadata(),
      winston.format.label('err')
    ),
    silent: suppressLogger,
    transports: [
      transports.errMongodb
    ].filter(Boolean)
  })
}

Meteor.loggers = {
  ...Meteor.loggers ?? {},
  con: getLogger('TESTAPP_LOGGER_SUPPRESS_CON'),
  err: getLogger('TESTAPP_LOGGER_SUPPRESS_ERR', 'mongoErrorReports')
}
