import { Meteor } from 'meteor/meteor'
import i18n from 'meteor/universe:i18n'

import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useMountedState } from 'react-use'

import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1, 1.5)
  }
}))

const t = i18n.createTranslator('App')
const T = i18n.createComponent(t)

function LogoutButton () {
  const classes = useStyles()
  const history = useHistory()
  const isMounted = useMountedState()

  const [sending, setSending] = useState(false)

  const handleLogoutAction = () => {
    if (sending) return

    setSending(true)
    Meteor.logout(() => {
      isMounted() && setSending(false)
      history.push('/')
    })
  }

  return (
    <Button
      color='inherit'
      variant='outlined'
      className={classes.button}
      disabled={sending}
      onClick={handleLogoutAction}
    >
      <T>AppBar.buttons.logout</T>
    </Button>
  )
}

export default LogoutButton
