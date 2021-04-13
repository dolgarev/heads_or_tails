import React from 'react'
import { SnackbarProvider } from 'notistack'

import CssBaseline from '@material-ui/core/CssBaseline'
import Slide from '@material-ui/core/Slide'
import AppContainer from './AppContainer.jsx'

function App () {
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
      TransitionComponent={Slide}
      preventDuplicate
      maxSnack={3}
    >
      <CssBaseline />
      <AppContainer />
    </SnackbarProvider>
  )
}

export default App
