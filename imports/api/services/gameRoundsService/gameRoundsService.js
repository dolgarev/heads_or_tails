import BaseService from '../baseService.js'

export default class GameRoundsService extends BaseService {
  constructor ({
    repositories,
    schemas,
    services
  }) {
    super({ services })
    this.gameRoundsRepository = repositories.gameRoundsRepository
    this.gameRoundCountersRepository = repositories.gameRoundCountersRepository
    this.playRoundSchema = schemas.playRoundSchema
    this.serviceName = 'GameRoundsService'
  }

  async playRound (playerId) {
    const data = this.__validate({ playerId }, this.playRoundSchema)

    const result = Math.floor(Math.random() * 2) === 0
      ? 'head'
      : 'tail'

    const newRoundId = this.gameRoundsRepository.insert({
      result,
      playerId: data.playerId,
      createdAt: new Date()
    })

    if (typeof newRoundId === 'string') {
      this.gameRoundCountersRepository.incItem(`${data.playerId}.attempts`)
      if (result === 'head') {
        this.gameRoundCountersRepository.incItem(`${data.playerId}.heads`)
      } else {
        this.gameRoundCountersRepository.incItem(`${data.playerId}.tails`)
      }
    }

    return [newRoundId, result]
  }
}
