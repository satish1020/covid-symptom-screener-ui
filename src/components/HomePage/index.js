import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Grid, Typography, makeStyles } from '@material-ui/core'
import { GoogleLogin } from 'react-google-login'

import { TOKEN_ID } from '../../constants'
import { UserContext } from '../Shared/context/userContext'
import { currentUserRole } from '../../services/users'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0 -16px',
    height: '100vh',
    background:
      'linear-gradient(180deg, #9bcbeb 7%, #ffffff 90%, rgba(255,255,255,0) 3%)',
  },
  container: {
    height: '100vh',
    padding: `0 16px`,
  },
  splashImage: {
    width: '30vw',
    maxWidth: '500px',
  },
  appTitle: {
    ...theme.titleText,
    textAlign: 'center',
    marginTop: '3rem',
    marginBottom: '3rem',
  },
  signInButton: {
    ...theme.buttonPrimary,
    marginTop: '3rem',
    marginBottom: '3rem',
    [theme.breakpoints.up('xs')]: {
      maxWidth: 338,
    },
  },
  subtext: {
    textAlign: 'center',
    fontSize: '0.9rem',
  },
}))

//TODO contact link needs a place with content
export const HomePage = () => {
  const classes = useStyles()
  const [userState, userActions] = useContext(UserContext)

  const getUserRole = async () => {
    try {
      const orgGetResp = await currentUserRole()
      if (orgGetResp !== undefined) {
        userActions.setUserRole(orgGetResp)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const responseGoogle = (response) => {
    if (response.tokenId) {
      localStorage.setItem(TOKEN_ID, response.tokenId)
      userActions.setLoggedIn(true)
      getUserRole()
    } else {
      userActions.setLoggedIn(false)
    }
  }

  if (userState.loggedIn) {
    return <Redirect to="/authorization" />
  }

  return (
    <div className={classes.root}>
      <Grid
        container
        className={classes.container}
        direction="column"
        justify="center"
        alignItems="center"
      >
        <img
          className={classes.splashImage}
          src={process.env.PUBLIC_URL + '/mn-logo.png'}
          alt="Logo"
        />
        <Typography className={classes.appTitle}>
          Assessment Aggregation
        </Typography>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}
          render={(renderProps) => (
            <Button
              className={classes.signInButton}
              fullWidth
              variant="contained"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              Sign In
            </Button>
          )}
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
        <Typography className={classes.subtext}>
          A valid Google account is needed to sign-in to this application.
        </Typography>
      </Grid>
    </div>
  )
}
