import { Meteor } from 'meteor/meteor'
import { loggedMixinsSet } from './extensions/mixins.js'

const { container } = Meteor.depsContainer
const gameRoundsService = container.services.GameRoundsService

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
