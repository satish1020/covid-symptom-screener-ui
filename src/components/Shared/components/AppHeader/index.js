import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import { GoogleLogout } from 'react-google-login'

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    height: '46px',
    backgroundColor: '#003865',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  logo: {
    width: '170px',
    marginBottom: '5px',
  },
  logout: {
    height: '40px',
    borderRadius: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    boxSizing: 'border-box',
    color: '#feffff',
    textAlign: 'center',
    lineHeight: 'normal',
    fontSize: '.8rem',
    textTransform: 'none',
  },
}))

export const AppHeader = (props) => {
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
          {props.isLoggedIn && (
            <GoogleLogout
              clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}
              render={(renderProps) => (
                <Button
                  color="inherit"
                  className={classes.logout}
                  onClick={renderProps.onClick}
                >
                  Sign Out
                </Button>
              )}
              onLogoutSuccess={logout}
            />
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default AppHeader

AppHeader.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}
