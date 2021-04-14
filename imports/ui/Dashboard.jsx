import { Emitter } from 'react-emitter'
import React from 'react'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'

import ResultsTable from './ResultsTable.jsx'
import PlayButton from './PlayButton.jsx'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(4)
  }
}))

function Dashboard () {
  const classes = useStyles()

  return (
    <Paper elevation={1} className={classes.root}>
      <Grid
        container
        direction='column'
        spacing={3}
      >
        <Grid container justify='flex-end'>
          <PlayButton />
        </Grid>
        <Grid item xs>
          <ResultsTable />
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Emitter(Dashboard)
