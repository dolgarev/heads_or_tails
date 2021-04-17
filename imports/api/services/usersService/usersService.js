import { Accounts } from 'meteor/accounts-base'

import BaseService from '../baseService.js'

import {
  createUserSchema
} from './usersService.schemas.js'

class UsersService extends BaseService {
  constructor () {
    super()
    this.serviceName = 'UsersService'
  }

  createUser (actorId, {
    email,
    password
  }) {
    const data = this.__validate({
      actorId,
      email,
      password
    }, createUserSchema)

    const newUserId = Accounts.createUser({
      email: data.email,
      password: data.password
    })

    if (typeof newUserId === 'string') {
      this.pubSub.publish('users.createUser', { userId: newUserId })
    }

    return [newUserId]
  }
}

export default new UsersService()
