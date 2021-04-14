import React from 'react'
import { SnackbarProvider } from 'notistack'
import { BrowserRouter } from 'react-router-dom'

import CssBaseline from '@material-ui/core/CssBaseline'
import Slide from '@material-ui/core/Slide'
import AppBar from './AppBar.jsx'
import AppContainer from './AppContainer.jsx'

function App () {
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
      <BrowserRouter>
        <AppBar />
        <AppContainer />
      </BrowserRouter>
    </SnackbarProvider>
  )
}

export default App
