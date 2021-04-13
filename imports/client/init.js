import { Meteor } from 'meteor/meteor'

if (Meteor.isProduction) {
  Reload._onMigrate(() => [false])
}

Meteor.users.deny({
  update () { return true }
})
