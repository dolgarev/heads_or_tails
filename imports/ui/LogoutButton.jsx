import { Meteor } from 'meteor/meteor'
import i18n from 'meteor/universe:i18n'

import React from 'react'
import { useHistory } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  logout: {
    margin: theme.spacing(1, 1.5)
  }
}))

const t = i18n.createTranslator('App')
const T = i18n.createComponent(t)

function LogoutButton () {
  const classes = useStyles()
  const history = useHistory()

  const handleLogoutAction = () => {
    Meteor.logout(() => {
      history.push('/')
    })
  }

  return (
    <Button
      color='inherit'
      variant='outlined'
      className={classes.logout}
      onClick={handleLogoutAction}
    >
      <T>AppBar.buttons.logout</T>
    </Button>
  )
}

export default LogoutButton
