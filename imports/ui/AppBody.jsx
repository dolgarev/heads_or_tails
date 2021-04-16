import { BrowserRouter } from 'react-router-dom'
import { EmitterProvider } from 'react-emitter'
import React from 'react'

import AppBar from './AppBar.jsx'
import AppContainer from './AppContainer.jsx'

function AppBody () {
  return (
    <BrowserRouter>
      <AppBar />
      <AppContainer />
    </BrowserRouter>
  )
}

export default EmitterProvider(AppBody)
