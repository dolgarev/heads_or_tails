import React from 'react'
import i18n from 'meteor/universe:i18n'

import classnames from 'classnames'

import Chip from '@material-ui/core/Chip'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  container: {
    height: '90vh'
  },
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    fontWeight: 500
  }
}))

const t = i18n.createTranslator('App')
const T = i18n.createComponent(t)

function LoadingUser () {
  const classes = useStyles()

  return (
    <Grid
      container
      justify='center'
      alignItems='center'
      className={classes.container}
    >
      <Chip
        label={<T>LoadingUser.label</T>}
        className={classnames(
          classes.root, 'animate__animated', 'animate__pulse', 'animate__infinite', 'animate__fast'
        )}
        color='secondary'
      />
    </Grid>
  )
}

export default LoadingUser
