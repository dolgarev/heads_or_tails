import { Meteor } from 'meteor/meteor'
import i18n from 'meteor/universe:i18n'
import { useTracker } from 'meteor/react-meteor-data'

import React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Grid from '@material-ui/core/Grid'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import LangSwitcher from './LangSwitcher.jsx'
import UserMenu from './UserMenu.jsx'

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
  tools: {
    width: 'auto'
  }
}))

const t = i18n.createTranslator('App')
const T = i18n.createComponent(t)

function AppBarComponent () {
  const classes = useStyles()

  const currUserId = useTracker(() => Meteor.userId(), [])

  return (
    <AppBar position='static' elevation={0} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant='h6' noWrap className={classes.toolbarTitle}>
          <T>AppBar.appName</T>
        </Typography>
        <Grid container alignItems='center' className={classes.tools}>
          <LangSwitcher />
          {typeof currUserId === 'string' && <UserMenu />}
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default AppBarComponent
