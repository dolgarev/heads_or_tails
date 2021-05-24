import UsersService from './usersService.js'

import { Accounts } from 'meteor/accounts-base'

import { createUserSchema } from './usersService.schemas.js'

export default new UsersService({
  schemas: {
    createUserSchema
  },
  services: {
    accountsService: Accounts
  }
})
