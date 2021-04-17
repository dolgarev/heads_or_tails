import { ValidationError } from 'meteor/mdg:validation-error'
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

    this.props.addListener('app.notifications.appendError', (err = '') => {
      const errMessages = []
      if (typeof err === 'string') {
        errMessages.push(err)
      } else if (ValidationError.is(err)) {
        errMessages.push(err.error)
      } else if (err instanceof Error) {
        const errId = err.details?.originalError?.errId
        const errMessage = err.reason ?? err.message ?? err.error
        errMessages.push(
          typeof errId === 'string'
            ? `${errMessage} (errcode is ${errId})`
            : errMessage
        )
      }
      for (const errMessage of errMessages) {
        this.appendSnackbar(errMessage, 'error')
      }
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
