import { Meteor } from 'meteor/meteor'
import { ReactiveDict } from 'meteor/reactive-dict'
import { Tracker } from 'meteor/tracker'

import LocaleLib from './lib/localeLib.js'

const AppState = new ReactiveDict('AppState', {
  'app.lang': LocaleLib.detectDefaultLang() ?? 'en'
})

Tracker.autorun(() => {
  const currUserId = Meteor.userId()
  AppState.set('currentUser.id', currUserId)
})

export default AppState
