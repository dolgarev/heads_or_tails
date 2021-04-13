import { Mongo } from 'meteor/mongo'

const DEFAULT_POOL_SIZE = 20

function safeParseJson (jsonString) {
  try {
    return JSON.parse(jsonString)
  } catch {}
}

if (process.env.MONGO_CONNECTION_OPTIONS) {
  const mongoOpts = safeParseJson(process.env.MONGO_CONNECTION_OPTIONS) ?? {}
  const opts = {
    poolSize: DEFAULT_POOL_SIZE,
    ...mongoOpts
  }
  Mongo.setConnectionOptions(opts)
}
