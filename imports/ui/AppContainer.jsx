import { EmitterProvider } from 'react-emitter'
import React from 'react'

import Container from '@material-ui/core/Container'

import AppNotifications from './AppNotifications.jsx'
import AppRouter from './AppRouter.jsx'

function AppContainer () {
  return (
    <Container component='main'>
      <AppRouter />
      <AppNotifications />
    </Container>
  )
}

export default EmitterProvider(AppContainer)
