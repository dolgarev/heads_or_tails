import { BrowserRouter } from 'react-router-dom'
import { EmitterProvider } from 'react-emitter'
import React from 'react'

import AppBar from './AppBar.jsx'
import AppContainer from './AppContainer.jsx'
import AppNotifications from './AppNotifications.jsx'

function AppBody () {
  return (
    <BrowserRouter>
      <AppBar />
      <AppContainer />
      <AppNotifications />
    </BrowserRouter>
  )
}

export default EmitterProvider(AppBody)
