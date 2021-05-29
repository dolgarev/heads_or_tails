import { Meteor } from 'meteor/meteor'

const Users = Meteor.users

if (Meteor.isServer) {
  Meteor.depsContainer.constant('repositories.users', Users)
}

export default Users
