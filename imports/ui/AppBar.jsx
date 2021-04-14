import { Meteor } from 'meteor/meteor'
import i18n from 'meteor/universe:i18n'
import { useTracker } from 'meteor/react-meteor-data'

import React from 'react'
import { useHistory } from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import UserAvatar from './UserAvatar.jsx'

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbar: {
    flexWrap: 'wrap'
  },
  toolbarTitle: {
    flexGrow: 1
  },
  logout: {
    margin: theme.spacing(1, 1.5)
  }
}))

const t = i18n.createTranslator('App')
const T = i18n.createComponent(t)

function AppBarComponent () {
  const classes = useStyles()
  const history = useHistory()

  const currUserId = useTracker(() => Meteor.userId(), [])

  const handleLogoutAction = () => {
    Meteor.logout(() => {
      history.push('/')
    })
  }

  return (
    <AppBar position='static' elevation={0} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant='h6' noWrap className={classes.toolbarTitle}>
          <T>AppBar.appName</T>
        </Typography>
        {typeof currUserId === 'string' && (
          <>
            <UserAvatar />
            <Button
              color='inherit'
              variant='outlined'
              className={classes.logout}
              onClick={handleLogoutAction}
            >
              <T>AppBar.buttons.logout</T>
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default AppBarComponent
