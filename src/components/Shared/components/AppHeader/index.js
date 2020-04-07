import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import { GoogleLogout } from 'react-google-login'
import { UserContext } from '../../context/userContext'
import { TOKEN_ID } from '../../../../constants'

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
    height: '40px',
    marginTop: '3px'
  },
  logout: {
    height: '40px',
    marginTop: '3px',
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

export const AppHeader = () => {
  const classes = useStyles()
  const [userState, userActions] = useContext(UserContext)

  const logout = () => {
    userActions.setLoggedIn(false)
    localStorage.removeItem(TOKEN_ID)
  }
  return (
    <div className={classes.root}>
      <AppBar elevation={0} position="static" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <img
            src={process.env.PUBLIC_URL + '/mn-logo-white.png'}
            alt="Minnesota Logo"
            className={classes.logo}
          />
          {userState.loggedIn && (
            <GoogleLogout
              clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}
              render={(renderProps) => (
                <Button
                  color="inherit"
                  data-testid="sign-out-button"
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
