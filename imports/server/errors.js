import { Meteor } from 'meteor/meteor'

Meteor.ApiError = Meteor.makeErrorType('ApiError', function ({
  error,
  reason,
  details,
  errId
}) {
  this.error = error
  this.reason = reason
  this.details = details
  this.errId = errId
  this.ts = Date.now()
})
