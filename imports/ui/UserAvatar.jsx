import { Meteor } from 'meteor/meteor'
import { useTracker } from 'meteor/react-meteor-data'

import React from 'react'

import Avatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles'

import deepOrange from '@material-ui/core/colors/deepOrange'

const useStyles = makeStyles((theme) => ({
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500]
  }
}))

function UserAvatar () {
  const classes = useStyles()

  const currUserEmail = useTracker(() => {
    const user = Meteor.user({ emails: 1 })
    return user?.emails?.[0].address ?? ''
  }, [])

  return <Avatar className={classes.orange}>{currUserEmail.slice(0, 2).toUpperCase()}</Avatar>
}

export default UserAvatar
