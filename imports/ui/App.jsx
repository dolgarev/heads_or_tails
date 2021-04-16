import i18n from 'meteor/universe:i18n'
import { useTracker } from 'meteor/react-meteor-data'
import React from 'react'
import { SnackbarProvider } from 'notistack'

import CssBaseline from '@material-ui/core/CssBaseline'
import Slide from '@material-ui/core/Slide'
import AppBody from './AppBody.jsx'

import AppState from './AppState.js'

setTimeout(() => {
  AppState.set('app.lang', 'ru')
}, 15 * 1000)

function App () {
  const lang = useTracker(() => AppState.get('app.lang'), [])
  i18n.setLocale(lang, { async: true, fresh: true })

  return (
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
  )
}

export default App
