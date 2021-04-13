import { Meteor } from 'meteor/meteor'
import SimpleSchema from 'simpl-schema'

// [https://github.com/aldeed/simple-schema-js#customize-the-error-that-is-thrown]
SimpleSchema.defineValidationErrorTransform(error => {
  const ddpError = new Meteor.Error(error.message)
  ddpError.error = 'validation-error'
  ddpError.details = error.details
  return ddpError
})
