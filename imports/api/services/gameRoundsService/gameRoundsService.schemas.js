import { Meteor } from 'meteor/meteor'
import SimpleSchema from 'simpl-schema'

const playRoundSchema = new SimpleSchema({
  playerId: SimpleSchema.RegEx.Id
})

Meteor.depsContainer.constant('schemas.playRound', playRoundSchema)
