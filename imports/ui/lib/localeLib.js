import i18n from 'meteor/universe:i18n'

export default class LocaleLib {
  static detectDefaultLocale () {
    return navigator.languages?.[0] ??
      navigator.language ??
      navigator.browserLanguage ??
      navigator.userLanguage
  }

  static detectDefaultLang (
    supportedLangs = i18n.getLanguages()
  ) {
    const lc = LocaleLib.detectDefaultLocale() ?? ''
    const lang = lc.trim().split(/-|_/)[0].toLowerCase()
    return supportedLangs.includes(lang) ? lang : undefined
  }
}
