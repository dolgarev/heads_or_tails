import { ReactiveDict } from 'meteor/reactive-dict'

import LocaleLib from './lib/localeLib.js'

export default new ReactiveDict('AppState', {
  'app.lang': LocaleLib.detectDefaultLang() ?? 'en'
})
