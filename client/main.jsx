import { Meteor } from 'meteor/meteor'
import React from 'react'
import ReactDOM from 'react-dom'

import 'animate.css/animate.css'

import '../i18n/en/app.i18n.json'
import '../i18n/en/simpleSchema.i18n.json'
import '../i18n/ru/app.i18n.json'
import '../i18n/ru/simpleSchema.i18n.json'

import '../imports/lib/simpleSchemaErrors.js'
import '../imports/client'

import App from '../imports/ui/App.jsx'

Meteor.startup(() => {
  ReactDOM.render(<App />, document.querySelector('#root'))
})
