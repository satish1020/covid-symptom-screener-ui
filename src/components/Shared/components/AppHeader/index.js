import React from 'react'
import logo from '../../../../logo-h-whi_rgb.png'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: '#00315a',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  logo: {
    width: '200px',
  },
}))

function AppHeader() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <AppBar elevation={0} position="static" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <img
            src={logo}
            alt="MN Department of Health"
            className={classes.logo}
          />
          {/* If (authenticated) else null */}
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default AppHeader
