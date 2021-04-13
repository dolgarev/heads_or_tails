import SimpleSchema from 'simpl-schema'

export const playRoundSchema = new SimpleSchema({
  playerId: SimpleSchema.RegEx.Id
})
