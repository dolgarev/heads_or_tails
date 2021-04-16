import { useTracker } from 'meteor/react-meteor-data'
import i18n from 'meteor/universe:i18n'
import React from 'react'
import { SnackbarProvider } from 'notistack'

import CssBaseline from '@material-ui/core/CssBaseline'
import Slide from '@material-ui/core/Slide'
import AppBody from './AppBody.jsx'

import AppState from './AppState.js'

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
