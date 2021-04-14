import i18n from 'meteor/universe:i18n'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const t = i18n.createTranslator('App')
const T = i18n.createComponent(t)

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '90vh',
    overflow: 'hidden',
    margin: 0,
    flex: 1
  },
  homeLink: {
    paddingLeft: theme.spacing(2)
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
        <Box display='flex' alignItems='center'>
          <Link component={RouterLink} to='/'>
            <T>NoMatch.backHome</T>
          </Link>
        </Box>
      </Grid>
    </Grid>
  )
}

export default NoMatch
