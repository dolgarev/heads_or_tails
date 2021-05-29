import { Meteor } from 'meteor/meteor'

import GameRoundsService from './gameRoundsService.js'
import './gameRoundsService.schemas.js'

const { container } = Meteor.depsContainer

Meteor.depsContainer.provider('services.GameRoundsService', function () {
  let instance

  this.$get = () => {
    instance ??= new GameRoundsService({
      repositories: {
        gameRoundsRepository: container.repositories.gameRounds,
        gameRoundCountersRepository: container.repositories.gameRoundCounters
      },
      schemas: {
        playRoundSchema: container.schemas.playRound
      }
    })
    return instance
  }
})
