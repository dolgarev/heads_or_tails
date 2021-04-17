import gravatarUrl from 'gravatar-url'
import React, { useMemo } from 'react'

import Avatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles'

import deepOrange from '@material-ui/core/colors/deepOrange'

import { useUserEmail } from './hooks/customHooks.js'

const useStyles = makeStyles((theme) => ({
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500]
  }
}))

const GRAVATAR_OPTS = { default: 404 }

function UserAvatar ({
  userId
}) {
  const classes = useStyles()

  const userEmail = useUserEmail(userId, [userId])
  const letterAvatar = userEmail.slice(0, 1).toUpperCase()

  const avatarUrl = useMemo(() => {
    return typeof userEmail === 'string' && userEmail.length > 0
      ? gravatarUrl(userEmail, GRAVATAR_OPTS)
      : null
  }, [userEmail])

  return (
    <Avatar
      {...{ ...(typeof avatarUrl === 'string' && { src: avatarUrl }) }}
      className={classes.orange}
    >
      {letterAvatar}
    </Avatar>
  )
}

export default UserAvatar
