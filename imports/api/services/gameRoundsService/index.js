import GameRoundsService from './gameRoundsService.js'

import GameRounds from '../../collections/gameRounds'
import GameRoundCounters from '../../collections/gameRoundCounters'

import { playRoundSchema } from './gameRoundsService.schemas.js'

export default new GameRoundsService({
  repositories: {
    gameRoundsRepository: GameRounds,
    gameRoundCountersRepository: GameRoundCounters
  },
  schemas: {
    playRoundSchema
  }
})
