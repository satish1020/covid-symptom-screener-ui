import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import { GoogleLogout } from 'react-google-login';

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
  logout: {
    textTransform: 'none'
  }
}))

export const AppHeader = props => {
  const classes = useStyles()

  const logout = () => {
    props.setIsLoggedIn(false)
  }
  return (
    <div className={classes.root}>
      <AppBar elevation={0} position="static" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <img
            src={process.env.PUBLIC_URL + '/logo-h-whi_rgb.png'}
            alt="MN Department of Health"
            className={classes.logo}
          />
          {props.isLoggedIn && 
            <GoogleLogout
            clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}
            render={(renderProps) => (
              <Button color="inherit" className={classes.logout} onClick={renderProps.onClick}>Logout</Button>
            )}
            onLogoutSuccess={logout}
            />}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default AppHeader

AppHeader.propTypes = {
  setIsLoggedIn: PropTypes.func,
  isLoggedIn: PropTypes.bool
}