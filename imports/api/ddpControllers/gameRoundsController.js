import { Meteor } from 'meteor/meteor'

import gameRoundsService from '../services/gameRoundsService'
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
    ] = gameRoundsService.__invokeMethod('playRound', this.userId)

    Meteor._forwardRpcMethodError(err)
    return result
  }
})
