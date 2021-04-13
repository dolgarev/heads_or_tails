import { Meteor } from 'meteor/meteor'
import SimpleSchema from 'simpl-schema'

import UsersService from '../services/usersService/usersService.js'

Meteor.createValidatedMethod({
  name: 'users.createUser',
  validate: new SimpleSchema({
    email: String,
    password: String
  }).validator({ clean: true }),
  run ({
    email,
    password
  }) {
    this.unblock()

    const [
      err,
      newUserId
    ] = UsersService.__invokeMethod('createUser', this.userId, { email, password })

    Meteor._forwardRpcMethodError(err)
    return newUserId
  }
})
