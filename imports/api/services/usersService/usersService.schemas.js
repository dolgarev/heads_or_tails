import { Meteor } from 'meteor/meteor'
import SimpleSchema from 'simpl-schema'

const createUserSchema = new SimpleSchema({
  email: SimpleSchema.RegEx.Email,
  password: String
})

Meteor.depsContainer.constant('schemas.createUser', createUserSchema)
