import i18n from 'meteor/universe:i18n'
import React from 'react'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const t = i18n.createTranslator('App')
const T = i18n.createComponent(t)

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
    margin: 0,
    flex: 1
  }
}))

function NoMatch () {
  const classes = useStyles()

  return (
    <Grid
      container
      justify='center'
      alignItems='center'
      spacing={8}
      className={classes.root}
    >
      <Grid item>
        <Typography variant='h1' align='center'>404</Typography>
      </Grid>
      <Grid item>
        <Typography>
          <T>NoMatch.notFound</T>
        </Typography>
      </Grid>
    </Grid>
  )
}

export default NoMatch
