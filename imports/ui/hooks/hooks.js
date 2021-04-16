import Meteor from 'meteor/meteor'
import { useTracker } from 'meteor/react-meteor-data'
import React, { useContext } from 'react'

const LangContext = React.createContext()
export const useLangContext = () => useContext(LangContext)

export const useCurrentUserId = useTracker(() => Meteor.userId(), [])
