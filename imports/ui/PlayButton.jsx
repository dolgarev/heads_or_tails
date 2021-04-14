import { Meteor } from 'meteor/meteor'
import i18n from 'meteor/universe:i18n'

import { Emitter } from 'react-emitter'
import React, { useCallback } from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  label: {
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6)
  }
}))

const t = i18n.createTranslator('App')
const T = i18n.createComponent(t)

function PlayButton ({
  emit
}) {
  const classes = useStyles()

  const handlePlayAction = useCallback(() => {
    Meteor.invoke('gameRounds.playRound').catch(err => {
      emit('app.notifications.appendError', err.message)
    })
  }, [])

  return (
    <Button
      variant='contained'
      color='primary'
      className={classes.label}
      onClick={handlePlayAction}
    >
      <T>PlayButton.action</T>
    </Button>
  )
}

export default Emitter(PlayButton)
