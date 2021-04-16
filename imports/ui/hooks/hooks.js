import { Meteor } from 'meteor/meteor'
import { useTracker } from 'meteor/react-meteor-data'
import React, { useContext } from 'react'

const LangContext = React.createContext()
export const useLangContext = () => useContext(LangContext)

export const useCurrentUserId = () => useTracker(() => Meteor.userId(), [])

export const useCurrentUserEmail = () => useTracker(() => {
  const user = Meteor.user({ emails: 1 })
  return user?.emails?.[0].address ?? ''
}, [])
