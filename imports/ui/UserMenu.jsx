import { Meteor } from 'meteor/meteor'
// import { useTracker } from 'meteor/react-meteor-data'
import i18n from 'meteor/universe:i18n'

import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useMountedState } from 'react-use'

import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'

import { useCurrentUserId } from './hooks/customHooks.js'

// import AppState from './AppState.js'
import UserAvatar from './UserAvatar.jsx'

const t = i18n.createTranslator('App')
const T = i18n.createComponent(t)

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1, 1.5)
  }
}))

function UserMenu () {
  const classes = useStyles()
  const history = useHistory()
  const isMounted = useMountedState()

  const [anchorEl, setAnchorEl] = useState(null)
  const [sending, setSending] = useState(false)

  const currUserId = useCurrentUserId()

  const handleOpenMenu = e => {
    setAnchorEl(e.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleLogoutAction = () => {
    if (sending) return

    setSending(true)
    Meteor.logout(() => {
      isMounted() && setSending(false)
      history.push('/')
    })
    handleCloseMenu()
  }

  return (
    <>
      <Button
        aria-controls='user-menu'
        aria-haspopup='true'
        color='default'
        className={classes.button}
        onClick={handleOpenMenu}
        endIcon=<ArrowDropDownIcon />
      >
        <UserAvatar userId={currUserId} />
      </Button>
      <Menu
        id='user-menu'
        anchorEl={anchorEl}
        keepMounted
        open={!!anchorEl}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleLogoutAction}><T>UserMenu.logout</T></MenuItem>
      </Menu>
    </>
  )
}

export default UserMenu
