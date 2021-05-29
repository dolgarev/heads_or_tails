import { Meteor } from 'meteor/meteor'

import Bottle from 'bottlejs'
import PubSub from 'pubsub-js'

const bottle = new Bottle()
bottle.constant('eventsService', PubSub)
bottle.constant('loggerService', Meteor.loggers.con)
bottle.constant('errorLoggerService', Meteor.loggers.err)

Meteor.depsContainer = bottle

export default bottle
