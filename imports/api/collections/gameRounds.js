import { Meteor } from 'meteor/meteor'

import CustomMongoCollection from './extensions/customMongoCollection'
class GameRoundsCollection extends CustomMongoCollection {}

const GameRounds = new GameRoundsCollection('gameRounds')

if (Meteor.isServer) {
  GameRounds._ensureIndex({
    playerId: 1
  }, {
    background: true
  })
  CustomMongoCollection.injectExtraMethods(GameRounds)
}

export default GameRounds
