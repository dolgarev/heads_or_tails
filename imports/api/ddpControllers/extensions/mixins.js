import { Meteor } from 'meteor/meteor'
import { RestrictMixin } from 'meteor/ziarno:restrict-mixin'

export const isLoggedInMixin = RestrictMixin.createMixin({
  condition (args) {
    return typeof this.userId !== 'string'
  },
  error (args) {
    return new Meteor.Error('user-not-loggedin')
  }
})

export const loggedMixinsSet = [isLoggedInMixin]
