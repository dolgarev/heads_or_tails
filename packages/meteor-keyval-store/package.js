/* global Package */

Package.describe({
  name: 'liberation:keyval-store',
  version: '0.0.3',
  // Brief, one-line summary of the package.
  summary: 'Simple key-value store for Meteor',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/dolgarev/meteor-keyval-store',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
})

Package.onUse(function (api) {
  api.versionsFrom('1.6.0.1')
  api.use(['ecmascript', 'mongo'], 'server')
  api.mainModule('meteor-keyval-store.js', 'server')
})

Package.onTest(function (api) {
  api.use('ecmascript')
  api.use('tinytest')
  api.use('liberation:keyval-store', 'server')
  api.mainModule('meteor-keyval-store-tests.js', 'server')
})
