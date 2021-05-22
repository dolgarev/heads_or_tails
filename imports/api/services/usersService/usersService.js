import { Accounts } from 'meteor/accounts-base'

import BaseService from '../baseService.js'

import { createUserSchema } from './usersService.schemas.js'

class UsersService extends BaseService {
  constructor ({
    schemas,
    services
  }) {
    super({ services })

    this.createUserSchema = schemas.createUserSchema
    this.accountsService = services.accountsService
    this.serviceName = 'UsersService'

    this.validateCreateUserParams = this.createUserSchema.validator({ clean: true })
  }

  async createUser (actorId, {
    email,
    password
  }) {
    const data = this.validateCreateUserParams({
      actorId,
      email,
      password
    })

    const newUserId = this.accountsService.createUser({
      email: data.email,
      password: data.password
    })

    if (typeof newUserId === 'string') {
      this.eventsService.publish('users.createUser', { userId: newUserId })
    }

    return [newUserId]
  }
}

export default new UsersService({
  schemas: {
    createUserSchema
  },
  services: {
    accountsService: Accounts
  }
})
