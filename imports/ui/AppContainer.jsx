import { EmitterProvider } from 'react-emitter'
import React from 'react'

import Container from '@material-ui/core/Container'
import AppRouter from './AppRouter.jsx'

function AppContainer () {
  return (
    <Container component='main'>
      <AppRouter />
    </Container>
  )
}

export default EmitterProvider(AppContainer)
