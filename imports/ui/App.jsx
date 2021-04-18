import { useTracker } from 'meteor/react-meteor-data'
import i18n from 'meteor/universe:i18n'
import React from 'react'
import { SnackbarProvider } from 'notistack'

import CssBaseline from '@material-ui/core/CssBaseline'
import Slide from '@material-ui/core/Slide'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

import { enUS, ruRU } from '@material-ui/core/locale'

import AppBody from './AppBody.jsx'
import AppState from './AppState.js'

const LOCALES = {
  en: enUS,
  ru: ruRU
}
const DEFAULT_LOCALE = 'enUS'

function App () {
  const lang = useTracker(() => AppState.get('app.lang'), [])
  i18n.setLocale(lang, { async: true, fresh: true })

  const locale = LOCALES[lang] ?? DEFAULT_LOCALE
  const theme = createMuiTheme({}, locale)

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        TransitionComponent={Slide}
        preventDuplicate
        maxSnack={3}
      >
        <CssBaseline />
        <AppBody />
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default App
