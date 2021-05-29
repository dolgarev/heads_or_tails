import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

import UsersService from './usersService.js'

import './usersService.schemas.js'

const { container } = Meteor.depsContainer

export default new UsersService({
  schemas: {
    createUserSchema: container.schemas.createUser
  },
  services: {
    accountsService: Accounts
  }
})
