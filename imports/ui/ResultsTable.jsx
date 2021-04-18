import { Meteor } from 'meteor/meteor'
import i18n from 'meteor/universe:i18n'
import { useTracker } from 'meteor/react-meteor-data'

import classnames from 'classnames'
import { Emitter } from 'react-emitter'
import moment from 'moment'
import React, { useState } from 'react'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'

import grey from '@material-ui/core/colors/grey'
import orange from '@material-ui/core/colors/orange'
import red from '@material-ui/core/colors/red'

import CustomTablePaginationActions from './helpers/CustomTablePaginationActions.jsx'

import GameRounds from '../api/collections/gameRounds.js'

const useStyles = makeStyles((theme) => ({
  loading: {
    opacity: 0.5,
    pointerEvents: 'none'
  },
  result: {
    display: 'inline-block',
    padding: `${theme.spacing(0.5)}px ${theme.spacing(3)}px`,
    borderRadius: '4px',
    color: grey[50],
    fontWeight: 500
  },
  head: {
    backgroundColor: red[500]
  },
  tail: {
    backgroundColor: orange[500]
  }
}))

const t = i18n.createTranslator('App')
const T = i18n.createComponent(t)

const DATETIME_FORMAT = 'DD.MM.YYYY HH:mm:ss'

function ResultsTable () {
  const classes = useStyles()

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const currUserId = useTracker(() => Meteor.userId(), [])

  const totalAttempts = useTracker(() => {
    const { attempts = 0 } = Meteor.user({ attempts: 1 }) ?? {}
    return attempts
  }, [currUserId])

  const roundsLoaded = useTracker(() => {
    const sub = Meteor.subscribe('dataSource.gameRounds', rowsPerPage, page * rowsPerPage)
    return sub.ready()
  }, [currUserId, page, rowsPerPage])

  const rounds = useTracker(() => {
    return GameRounds.find({
      playerId: currUserId
    }, {
      fields: {
        result: 1,
        createdAt: 1
      },
      sort: {
        createdAt: -1
      },
      limit: rowsPerPage
    }).fetch()
  }, [currUserId, rowsPerPage])

  return (
    <Paper elevation={0}>
      <TableContainer className={classnames({ [classes.loading]: !roundsLoaded })}>
        <Table className={classes.table} aria-label='game rounds'>
          <TableHead>
            <TableRow>
              <TableCell align='center'><T>ResultsTable.cols.result</T></TableCell>
              <TableCell align='center'><T>ResultsTable.cols.date</T></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rounds.map(round => (
              <TableRow key={round._id}>
                <TableCell align='center'>
                  {
                    (round.result === 'head' || round.result === true)
                      ? <T _props={{ className: classnames(classes.result, classes.head) }}>ResultsTable.result.head</T>
                      : <T _props={{ className: classnames(classes.result, classes.tail) }}>ResultsTable.result.tail</T>
                  }
                </TableCell>
                <TableCell align='center'>
                  {moment(round.createdAt).format(DATETIME_FORMAT)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={totalAttempts}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        ActionsComponent={CustomTablePaginationActions}
      />
    </Paper>
  )
}

export default Emitter(ResultsTable)
