import React from 'react'
import { Button, Grid, Link, Typography, makeStyles } from "@material-ui/core";
import { GoogleLogin } from 'react-google-login';

const useStyles = makeStyles(() => ({
  pageContainer: {
    height: '100vh'
  },
  splashImage: {
    width: '80vw',
    maxWidth: '500px'
  },
  appTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    marginTop: '3rem'
  },
  signInButton: {
    border: '1px solid black',
    backgroundColor: '#fff',
    textTransform: 'none',
    marginTop: '3rem',
    marginBottom: '3rem',
  }
}));

export const HomePage = props => {
  const classes = useStyles()

  const responseGoogle = (response) => {
    if (response.accessToken){
      localStorage.setItem('access_token', response.accessToken)
      props.setIsLoggedIn(true)
    }
  }

  return (
    <Grid className={classes.pageContainer} container direction="column" justify="center" alignItems="center">
        <img className={classes.splashImage} src={process.env.PUBLIC_URL + '/mdh-logo.png'} alt="Logo" />
        <Typography className={classes.appTitle}>Temperature Measurement Application</Typography>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}
          render={renderProps => (
            <Button className={classes.signInButton} fullWidth variant="contained" onClick={renderProps.onClick} disabled={renderProps.disabled}>Measurer Sign In</Button>
          )}
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
        <Link href="registration">Organization Registration</Link>
    </Grid>);
}
