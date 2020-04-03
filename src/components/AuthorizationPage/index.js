import React, { useState } from 'react'
import { Button, Grid, TextField, Typography, makeStyles } from '@material-ui/core'
import PageTitle from '../Shared/components/PageTitle'
import {getOrganizationForAuthCode} from "../../services/organizations";

export const AuthorizationPage = () => {
  const classes = useStyles()
  const [authCode, setAuthCode] = useState('')
  const [helperText, setHelperText] = useState('')
  const submitOrgAuth = async () => {
    try {
      const orgGetResp = await getOrganizationForAuthCode(authCode)
      if (orgGetResp === undefined) {
        setHelperText('Invalid Authorization Code')
      } else {
        // TODO add organization data to context, we will need org name to display, authorization_code for saving data, etc
      }
    } catch (err) {
        console.error(err)
    }
  }
  const handleOrgChange = (event) => {
    setAuthCode(event.target.value)
  }

  return (
    <Grid
      container
      className={classes.pageContainer}
      direction="column"
      justify="center"
      alignItems="center">
      <div className={classes.textContainer}>
        <PageTitle title="Sign in" />
        <Typography>
          A leader within your company should have provided you with an
          authorization code to continue.
        </Typography>
      </div>
      <TextField
        className={classes.authCode}
        id="org-auth-code"
        label="Authorization Code"
        value={authCode}
        onChange={handleOrgChange}
        helperText={helperText}
      />
      <Button
        className={classes.submitButton}
        variant="contained"
        onClick={submitOrgAuth}
      >
        Submit
      </Button>
    </Grid>
  )
}

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    textAlign: 'center',
  },
  textContainer: {
    margin: '1rem',
    textAlign: 'left',
    marginBottom: '1rem',
  },
  authCode: {
    marginBottom: '1rem',
    maxWidth: '300px',
    width: '90%',
  },
  submitButton: {
    ...theme.buttonPrimary,
    marginBottom: '1rem',
    [theme.breakpoints.up('xs')]: {
      maxWidth: 338,
    },
  },
  cancelButton: {
    ...theme.buttonSecondary,
  },
}))
