import { useTracker } from 'meteor/react-meteor-data'
import i18n from 'meteor/universe:i18n'

import React, { useState } from 'react'

import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import LanguageIcon from '@material-ui/icons/Language'

import AppState from './AppState.js'

const t = i18n.createTranslator('App')
const T = i18n.createComponent(t)

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1, 1.5)
  }
}))

function LangSwitcher () {
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = useState(null)
  const lang = useTracker(() => AppState.get('app.lang'), [])

  const handleOpenMenu = e => {
    setAnchorEl(e.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleSelectLang = lang => () => {
    AppState.set('app.lang', lang)
    handleCloseMenu()
  }

  return (
    <>
      <Button
        aria-controls='lang-menu'
        aria-haspopup='true'
        color='default'
        variant='outlined'
        className={classes.button}
        onClick={handleOpenMenu}
        startIcon=<LanguageIcon />
        endIcon=<ArrowDropDownIcon />
      >
        <T>{`LangSwitcher.lang.${lang}`}</T>
      </Button>
      <Menu
        id='lang-menu'
        anchorEl={anchorEl}
        keepMounted
        open={!!anchorEl}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleSelectLang('en')}><T>LangSwitcher.lang.en</T></MenuItem>
        <MenuItem onClick={handleSelectLang('ru')}><T>LangSwitcher.lang.ru</T></MenuItem>
      </Menu>
    </>
  )
}

export default LangSwitcher
