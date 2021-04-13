import { Emitter } from 'react-emitter'
import React from 'react'
import { withSnackbar } from 'notistack'

import Button from '@material-ui/core/Button'
import CloseIcon from '@material-ui/icons/Close'

class AppNotifications extends React.Component {
  componentDidMount () {
    this.props.addListener('app.notifications.appendNotification', (
      message = '',
      variant = 'default'
    ) => {
      this.appendSnackbar(message, variant)
    })

    this.props.addListener('app.notifications.appendError', (message = '') => {
      this.appendSnackbar(message, 'error')
    })

    this.props.addListener('app.notifications.appendSuccess', (message = '') => {
      this.appendSnackbar(message, 'success')
    })

    this.props.addListener('app.notifications.appendWarning', (message = '') => {
      this.appendSnackbar(message, 'warning')
    })

    this.props.addListener('app.notifications.appendInfo', (message = '') => {
      this.appendSnackbar(message, 'info')
    })
  }

  componentWillUnmount () {
    this.props.removeAllListeners()
  }

  appendSnackbar (message, variant) {
    this.props.enqueueSnackbar(message, {
      variant,
      preventDuplicate: true,
      action: key => (
        <Button size='small' onClick={() => { this.props.closeSnackbar(key) }}>
          <CloseIcon color='action' fontSize='small' />
        </Button>
      )
    })
  }

  render () {
    return null
  }
}

export default Emitter(withSnackbar(AppNotifications))
