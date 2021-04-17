import { DDP } from 'meteor/ddp'
import { DDPCommon } from 'meteor/ddp-common'
import { Meteor } from 'meteor/meteor'
import { MongoInternals } from 'meteor/mongo'
import { ValidatedMethod } from 'meteor/mdg:validated-method'

Meteor.createValidatedMethod = (...args) => new ValidatedMethod(...args)

// Method .runAsUser based on code from package dispatch:run-as-user
Meteor.runAsUser = function runAsUser (userId, f) {
  const currentInvocation = DDP._CurrentInvocation.get()
  const invocation = new DDPCommon.MethodInvocation({
    ...currentInvocation,
    userId
  })

  return DDP._CurrentInvocation.withValue(invocation, function () {
    return f.call(invocation, userId)
  })
}

Meteor.detectMongoUrl = function detectMongoUrl () {
  return process.env.MONGO_URL ?? MongoInternals.defaultRemoteCollectionDriver().mongo.client.s.url
}

Meteor._forwardRpcMethodError = function _forwardRpcMethodError (err) {
  if (err) {
    const error = err.error ?? 'rpc-error'
    const reason = err.reason ?? err.error ?? err.message
    throw new Meteor.Error(error, reason, { originalError: err })
  }
}
