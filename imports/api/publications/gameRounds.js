import { Meteor } from 'meteor/meteor'

import GameRounds from '../collections/gameRounds.js'
import GameRoundCounters from '../collections/gameRoundCounters.js'

const UsersCollection = Meteor.users._name

Meteor.publish('dataSource.gameRounds', function gameRounds (
  limit = 10,
  skip = 0
) {
  this.unblock()
  if (typeof this.userId !== 'string') return this.ready()

  const key = `${this.userId}.attempts`
  const cursor = GameRoundCounters.find(key, {
    fields: {
      val: 1
    }
  })

  const ctx = this
  const handle = cursor.observeChanges({
    added (id, { val }) {
      ctx.added(UsersCollection, ctx.userId, { attempts: val })
    },
    changed (id, { val }) {
      ctx.changed(UsersCollection, ctx.userId, { attempts: val })
    }
  }, {
    nonMutatingCallbacks: true
  })

  this.onStop(() => {
    handle.stop()
  })

  return GameRounds.find({
    playerId: this.userId
  }, {
    fields: {
      result: 1,
      createdAt: 1
    },
    sort: {
      createdAt: -1
    },
    limit,
    ...(skip > 0 && { skip })
  })
})
