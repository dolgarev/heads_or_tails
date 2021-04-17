import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

const {
  appName = 'Heads and Tails',
  supportEmail = 'no-reply@example.com'
} = Meteor.settings?.public ?? {}

Accounts.emailTemplates.siteName = appName
Accounts.emailTemplates.from = `${appName} Support ${supportEmail}`

Accounts.emailTemplates.resetPassword = {
  subject () {
    return `${appName}: Reset Your Password`
  },
  text (user, url) {
    const urlWithoutHash = url.replace('#/', '')
    return `To reset your password, simply click the following link:\n\n${urlWithoutHash}\n\nIf you did not request this verification, please ignore this email.\nIf you feel something is wrong, please contact our support team: ${supportEmail}.`
  }
}

Accounts.validateLoginAttempt(({ allowed, error }) => {
  if (allowed) return allowed
  throw new Meteor.Error(error.error ?? error.message)
})
