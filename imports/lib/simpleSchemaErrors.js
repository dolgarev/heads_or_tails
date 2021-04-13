import i18n from 'meteor/universe:i18n'
import SimpleSchema from 'simpl-schema'

SimpleSchema.setDefaultMessages({
  messages: {
    en: {
      [SimpleSchema.ErrorTypes.REQUIRED]: ctx => i18n.__('SimpleSchema.errors.required', ctx),
      [SimpleSchema.ErrorTypes.MIN_STRING]: ctx => i18n.__('SimpleSchema.errors.minString', ctx),
      [SimpleSchema.ErrorTypes.MAX_STRING]: ctx => i18n.__('SimpleSchema.errors.maxString', ctx),
      [SimpleSchema.ErrorTypes.MIN_NUMBER]: ctx => i18n.__('SimpleSchema.errors.minNumber', ctx),
      [SimpleSchema.ErrorTypes.MAX_NUMBER]: ctx => i18n.__('SimpleSchema.errors.maxNumber', ctx),
      [SimpleSchema.ErrorTypes.MIN_NUMBER_EXCLUSIVE]: ctx => i18n.__('SimpleSchema.errors.minNumberExclusive', ctx),
      [SimpleSchema.ErrorTypes.MAX_NUMBER_EXCLUSIVE]: ctx => i18n.__('SimpleSchema.errors.maxNumberExclusive', ctx),
      [SimpleSchema.ErrorTypes.MIN_DATE]: ctx => i18n.__('SimpleSchema.errors.minDate', ctx),
      [SimpleSchema.ErrorTypes.MAX_DATE]: ctx => i18n.__('SimpleSchema.errors.maxDate', ctx),
      [SimpleSchema.ErrorTypes.BAD_DATE]: ctx => i18n.__('SimpleSchema.errors.badDate', ctx),
      [SimpleSchema.ErrorTypes.MIN_COUNT]: ctx => i18n.__('SimpleSchema.errors.minCount', ctx),
      [SimpleSchema.ErrorTypes.MAX_COUNT]: ctx => i18n.__('SimpleSchema.errors.maxCount', ctx),
      [SimpleSchema.ErrorTypes.MUST_BE_INTEGER]: ctx => i18n.__('SimpleSchema.errors.noDecimal', ctx),
      [SimpleSchema.ErrorTypes.VALUE_NOT_ALLOWED]: ctx => i18n.__('SimpleSchema.errors.notAllowed', ctx),
      [SimpleSchema.ErrorTypes.EXPECTED_TYPE]: ctx => i18n.__('SimpleSchema.errors.expectedType', ctx),
      [SimpleSchema.ErrorTypes.FAILED_REGULAR_EXPRESSION] (ctx) {
        switch (ctx.regExp) {
          case (SimpleSchema.RegEx.Email.toString()):
          case (SimpleSchema.RegEx.EmailWithTLD.toString()):
            return i18n.__('SimpleSchema.errors.regEx.Email', ctx)
          case (SimpleSchema.RegEx.Domain.toString()):
            return i18n.__('SimpleSchema.errors.regEx.WeakDomain', ctx)
          case (SimpleSchema.RegEx.WeakDomain.toString()):
            return i18n.__('SimpleSchema.errors.regEx.Domain', ctx)
          case (SimpleSchema.RegEx.IP.toString()):
            return i18n.__('SimpleSchema.errors.regEx.IP', ctx)
          case (SimpleSchema.RegEx.IPv4.toString()):
            return i18n.__('SimpleSchema.errors.regEx.IPv4', ctx)
          case (SimpleSchema.RegEx.IPv6.toString()):
            return i18n.__('SimpleSchema.errors.regEx.IPv6', ctx)
          case (SimpleSchema.RegEx.Url.toString()):
            return i18n.__('SimpleSchema.errors.regEx.Url', ctx)
          case (SimpleSchema.RegEx.Id.toString()):
            return i18n.__('SimpleSchema.errors.regEx.Id', ctx)
          case (SimpleSchema.RegEx.ZipCode.toString()):
            return i18n.__('SimpleSchema.errors.regEx.ZipCode', ctx)
          case (SimpleSchema.RegEx.Phone.toString()):
            return i18n.__('SimpleSchema.errors.regEx.Phone', ctx)
          default:
            return i18n.__('SimpleSchema.errors.regEx.msg', ctx)
        }
      },
      [SimpleSchema.ErrorTypes.KEY_NOT_IN_SCHEMA]: ctx => i18n.__('SimpleSchema.errors.keyNotInSchema', ctx),
      mismatchPassword: ctx => i18n.__('SimpleSchema.errors.mismatchPassword', ctx)
    }
  }
})
