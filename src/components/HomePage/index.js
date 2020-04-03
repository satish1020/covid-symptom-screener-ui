import React from 'react'
import { Button, Grid, Link, Typography, makeStyles } from '@material-ui/core'
import { GoogleLogin } from 'react-google-login'

import { ACCESS_TOKEN } from '../../constants'

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

export const HomePage = (props) => {
  const classes = useStyles()

  const responseGoogle = (response) => {
    if (response.accessToken) {
      localStorage.setItem(ACCESS_TOKEN, response.accessToken)
      props.setIsLoggedIn(true)
    }
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
          src={process.env.PUBLIC_URL + '/mdh-logo.png'}
          alt="Logo"
        />
        <Typography className={classes.appTitle}>
          Temperature Aggregator
        </Typography>
        <Typography className={classes.subtext}>
          Minnesota cares about your workplace, so we've made a simple way to
          continue the fight against COVID-19 by taking temperatures across the
          state as people return.
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
              Measurer Sign In
            </Button>
          )}
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
        <Link href="registration">Organization Registration</Link>
      </Grid>
    </div>
  )
}
