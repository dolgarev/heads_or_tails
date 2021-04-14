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
  const userLoading = useTracker(() => Meteor.loggingIn() || Meteor.loggingOut(), [])
  const loggedIn = typeof currentUserId === 'string'

  if (userLoading) return null

  return (
    <Switch>
      <Route exact path='/signin'>
        {loggedIn ? <Redirect to='/' /> : <SignIn />}
      </Route>
      <Route exact path='/signup'>
        {loggedIn ? <Redirect to='/' /> : <SignUp />}
      </Route>
      <Route exact path='/forgot-password'>
        {loggedIn ? <Redirect to='/' /> : <ForgotPassword />}
      </Route>
      <Route exact path='/reset-password/:token'>
        {loggedIn ? <Redirect to='/' /> : <ResetPassword />}
      </Route>
      <Route exact path='/dashboard'>
        {loggedIn ? <Dashboard /> : <Redirect to='/' />}
      </Route>
      <Route exact path='/404' component={NoMatch} />
      <Route exact path='/'>
        {loggedIn ? <Redirect to='/dashboard' /> : <Redirect to='/signin' />}
      </Route>
      <Route path='*'>
        {<Redirect to='/404' />}
      </Route>
    </Switch>
  )
}

export default AppRouter
