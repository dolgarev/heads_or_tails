import { Accounts } from 'meteor/accounts-base'
import i18n from 'meteor/universe:i18n'

import { Emitter } from 'react-emitter'
import React, { useState } from 'react'
import { Link as RouterLink, useHistory, useParams } from 'react-router-dom'
import { useMountedState } from 'react-use'
import SimpleSchema from 'simpl-schema'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Grow from '@material-ui/core/Grow'
import InputAdornment from '@material-ui/core/InputAdornment'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import DialpadIcon from '@material-ui/icons/Dialpad'

import SimpleSchemaValidator from '../lib/simpleSchemaValidator.js'

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
  paper: {
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2)
  },
  submit: {
    margin: theme.spacing(2, 0, 2)
  }
}))

const resetPasswordFormSchema = new SimpleSchema({
  password: {
    type: String,
    min: 6,
    max: 128
  },
  password2: {
    type: String,
    min: 6,
    max: 128,
    custom () {
      const password = this.field('password').value
      const password2 = this.value
      if (password !== password2) return 'mismatchPassword'
    }
  }
})

function ResetPassword ({
  emit
}) {
  const classes = useStyles()
  const history = useHistory()
  const isMounted = useMountedState()
  const { token } = useParams()

  const [userPassword, setUserPassword] = useState('')
  const [userPassword2, setUserPassword2] = useState('')
  const [formErrors, setFormErrors] = useState(new Map())
  const [sending, setSending] = useState(false)

  const changeFormField = e => {
    e.preventDefault()

    const f = e.target.name
    const val = e.target.value
    if (f === 'password') {
      setUserPassword(val)
      formErrors.delete('password')
    } else if (f === 'password2') {
      setUserPassword2(val)
      formErrors.delete('password2')
    }
  }

  const submitForm = e => {
    e.preventDefault()
    if (sending) return

    const rawFormData = {
      password: userPassword,
      password2: userPassword2
    }
    const [errs, formData] = SimpleSchemaValidator.validateObject(rawFormData, resetPasswordFormSchema)
    setFormErrors(errs)
    if (errs.size > 0) return

    setSending(true)
    Accounts.resetPassword(token, formData.password, err => {
      if (err) {
        isMounted() && setSending(false)
        emit('app.notifications.appendError', err.message)
      } else {
        history.push('/')
      }
    })
  }

  return (
    <Grid
      container
      justify='center'
      alignItems='center'
      className={classes.root}
    >
      <Grow in>
        <Paper className={classes.paper}>
          <Typography component='h1' variant='h5'>
            <T>ResetPassword.formHeader</T>
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={submitForm}
          >
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label={<T>SignUp.labels.password</T>}
              type='password'
              id='password'
              autoComplete='current-password'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <DialpadIcon />
                  </InputAdornment>
                )
              }}
              value={userPassword}
              onChange={changeFormField}
              {...(formErrors.has('password') && {
                error: true,
                helperText: formErrors.get('password').err
              })}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password2'
              label={<T>SignUp.labels.confirmPassword</T>}
              type='password'
              id='password2'
              autoComplete='current-password'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <DialpadIcon />
                  </InputAdornment>
                )
              }}
              value={userPassword2}
              onChange={changeFormField}
              {...(formErrors.has('password2') && {
                error: true,
                helperText: formErrors.get('password2').err
              })}
            />
            <Button
              className={classes.submit}
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              disabled={sending}
            >
              <T>ResetPassword.buttons.reset</T>
            </Button>
          </form>
          <Grid container>
            <Grid item />
            <Grid item>
              <Link component={RouterLink} to='/signin' variant='body2'>
                <T>ResetPassword.links.signIn</T>
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </Grow>
    </Grid>
  )
}

export default Emitter(ResetPassword)
