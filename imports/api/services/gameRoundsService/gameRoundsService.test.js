/* eslint-env mocha */
import { Meteor } from 'meteor/meteor'
import { Random } from 'meteor/random'
import { assert } from 'chai'

import GameRoundsService from './gameRoundsService.js'

import GameRounds from '../../collections/gameRounds'
import GameRoundCounters from '../../collections/gameRoundCounters'

import { playRoundSchema } from './gameRoundsService.schemas.js'

import '../../../server/loggers.js'

const gameRoundsService = new GameRoundsService({
  repositories: {
    gameRoundsRepository: GameRounds,
    gameRoundCountersRepository: GameRoundCounters
  },
  schemas: {
    playRoundSchema
  },
  services: {
    loggerService: Meteor.loggers.con,
    errorLoggerService: Meteor.loggers.err
  }
})

describe('Game Rounds Service', function () {
  it('Play new round', async function () {
    const playerId = Random.id()
    const res = await gameRoundsService.playRound(playerId)
    assert.typeOf(res, 'array')
    assert.lengthOf(res, 2)
  })
})
