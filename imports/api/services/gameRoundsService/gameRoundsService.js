import BaseService from '../baseService.js'

import GameRounds from '../../collections/gameRounds'
import GameRoundCounters from '../../collections/gameRoundCounters'

import {
  playRoundSchema
} from './gameRoundsService.schemas.js'

class GameRoundsService extends BaseService {
  constructor () {
    super()
    this.serviceName = 'GameRoundsService'
  }

  playRound (playerId) {
    this.__validate({ playerId }, playRoundSchema)

    const result = Math.floor(Math.random() * 2) === 0
      ? 'head'
      : 'tail'

    const newRoundId = GameRounds.insert({
      result,
      playerId,
      createdAt: new Date()
    })

    if (typeof newRoundId === 'string') {
      GameRoundCounters.incItem(`${playerId}.attempts`)
      if (result === 'head') {
        GameRoundCounters.incItem(`${playerId}.heads`)
      } else {
        GameRoundCounters.incItem(`${playerId}.tails`)
      }
    }

    return [newRoundId, result]
  }
}

export default new GameRoundsService()
