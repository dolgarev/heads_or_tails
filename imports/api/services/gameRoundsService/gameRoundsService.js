import BaseService from '../baseService.js'

import GameRounds from '../../collections/gameRounds'
import GameRoundCounters from '../../collections/gameRoundCounters'

import { playRoundSchema } from './gameRoundsService.schemas.js'

export class GameRoundsService extends BaseService {
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

    this.validatePlayRoundParams = this.playRoundSchema.validator({ clean: true })
  }

  async playRound (playerId) {
    this.validatePlayRoundParams({ playerId })

    const result = Math.floor(Math.random() * 2) === 0
      ? 'head'
      : 'tail'

    const newRoundId = this.gameRoundsRepository.insert({
      result,
      playerId,
      createdAt: new Date()
    })

    if (typeof newRoundId === 'string') {
      this.gameRoundCountersRepository.incItem(`${playerId}.attempts`)
      if (result === 'head') {
        this.gameRoundCountersRepository.incItem(`${playerId}.heads`)
      } else {
        this.gameRoundCountersRepository.incItem(`${playerId}.tails`)
      }
    }

    return [newRoundId, result]
  }
}

export default new GameRoundsService({
  repositories: {
    gameRoundsRepository: GameRounds,
    gameRoundCountersRepository: GameRoundCounters
  },
  schemas: {
    playRoundSchema
  }
})
