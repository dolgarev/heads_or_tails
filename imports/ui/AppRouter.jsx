import { Meteor } from 'meteor/meteor'
import { useTracker } from 'meteor/react-meteor-data'
import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import SignIn from './SignIn.jsx'
import SignUp from './SignUp.jsx'
import ForgotPassword from './ForgotPassword.jsx'
import ResetPassword from './ResetPassword.jsx'
import Dashboard from './Dashboard.jsx'
import NoMatch from './NoMatch.jsx'

function AppRouter () {
  const currentUserId = useTracker(() => Meteor.userId(), [])
  const userLoading = Meteor.loggingIn() || Meteor.loggingOut()
  const loggedIn = typeof currentUserId === 'string'

  console.log('loggedIn', loggedIn, userLoading)

  return (
    <Switch>
      {!loggedIn && (
        <Route exact path='/signin' component={SignIn} />
      )}
      {!loggedIn && (
        <Route path='/signup' component={SignUp} />
      )}
      {!loggedIn && (
        <Route path='/forgot-password' component={ForgotPassword} />
      )}
      {!loggedIn && (
        <Route path='/reset-password/:token' component={ResetPassword} />
      )}
      {loggedIn && (
        <Route path='/dashboard' component={Dashboard} />
      )}
      <Route exact path='/'>
        {loggedIn ? <Redirect to='/dashboard' /> : <Redirect to='/signin' /> }
      </Route>
      <Route exact path='/404' component={NoMatch} />
      <Route path='*'>
        {<Redirect to='/404' />}
      </Route>
    </Switch>
  )
}

export default AppRouter
