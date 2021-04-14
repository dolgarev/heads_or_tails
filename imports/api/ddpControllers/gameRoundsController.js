import { Meteor } from 'meteor/meteor'

import GameRoundsService from '../services/gameRoundsService/gameRoundsService.js'
import { loggedMixinsSet } from './extensions/mixins.js'

Meteor.createValidatedMethod({
  name: 'gameRounds.playRound',
  mixins: [...loggedMixinsSet],
  validate: null,
  run () {
    this.unblock()

    const [
      err,
      ,
      result
    ] = GameRoundsService.__invokeMethod('playRound', this.userId)

    Meteor._forwardRpcMethodError(err)
    return result
  }
})
