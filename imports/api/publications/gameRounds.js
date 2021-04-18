import { check, Match } from 'meteor/check'
import { Meteor } from 'meteor/meteor'

import GameRounds from '../collections/gameRounds.js'
import GameRoundCounters from '../collections/gameRoundCounters.js'

const UsersCollection = Meteor.users._name

Meteor.publish('dataSource.gameRounds', function gameRounds (
  limit = 10,
  skip = 0,
  sortBy = ['createdAt', 'desc']
) {
  this.unblock()
  if (typeof this.userId !== 'string') return this.ready()

  check(limit, Match.Where(v => Match.test(v, Match.Integer) && v > 0))
  check(skip, Match.Where(v => Match.test(v, Match.Integer) && v >= 0))
  check(sortBy, Match.Where(v => {
    return Array.isArray(v) &&
      v[0] === 'createdAt' &&
      (v[1] === 'asc' || v[1] === 'desc')
  }))

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
      playerId: 1,
      result: 1,
      createdAt: 1
    },
    sort: [sortBy],
    limit,
    ...(skip > 0 && { skip })
  })
})
