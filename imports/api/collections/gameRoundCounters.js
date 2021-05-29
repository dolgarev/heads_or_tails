import { Meteor } from 'meteor/meteor'
import KeyValStore from 'meteor/liberation:keyval-store'

const GameRoundCounters = new (KeyValStore())('gameRoundCounters')

if (Meteor.isServer) {
  Meteor.depsContainer.constant('repositories.gameRoundCounters', GameRoundCounters)
}

export default GameRoundCounters
