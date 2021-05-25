import BaseService from '../baseService.js'

export default class UsersService extends BaseService {
  constructor ({
    schemas,
    services
  }) {
    super({ services })

    this.createUserSchema = schemas.createUserSchema
    this.accountsService = services.accountsService
    this.serviceName = 'UsersService'
  }

  async createUser (actorId, {
    email,
    password
  }) {
    const data = this.__validate({
      actorId,
      email,
      password
    }, this.createUserSchema)

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
