import React, { useContext, useState } from 'react'
import {
  Button,
  Grid,
  Link,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core'
import PageTitle from '../Shared/components/PageTitle'
import { getOrganizationForAuthCode } from '../../services/organizations'
import { UserContext } from '../Shared/context/userContext'
import { isRoleAdmin } from '../../services/users'

export const AuthorizationPage = () => {
  const classes = useStyles()
  const [authCode, setAuthCode] = useState('')
  const [helperText, setHelperText] = useState('')
  const [userState, userActions] = useContext(UserContext)

  const submitOrgAuth = async () => {
    try {
      const orgGetResp = await getOrganizationForAuthCode(authCode)
      if (orgGetResp === undefined) {
        setHelperText('Invalid Authorization Code')
      } else {
        userActions.setOrganization(orgGetResp)
      }
    } catch (err) {
      console.error(err)
    }
  }
  const handleOrgChange = (event) => {
    setAuthCode(event.target.value)
  }

  const isAdmin = isRoleAdmin(userState.userRole)

  return (
    <Grid
      container
      className={classes.pageContainer}
      direction="column"
      justify="center"
      alignItems="center"
    >
      <div className={classes.textContainer}>
        <PageTitle title="Your Organization" />
        <Typography>
          In order to submit assessments, you must first enter your organization's PIN. Don't have a PIN? You may need to{' '}
          <Link href="/registration">register your organization</Link>.
        </Typography>
      </div>
      <TextField
        className={classes.authCode}
        id="org-auth-code"
        label="Organization PIN"
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

      <Link href="/registration" className={classes.pageLink}>
        Organization Registration
      </Link>
      {isAdmin && (
        <Link href="/management" className={classes.pageLink}>
          Admin Portal
        </Link>
      )}
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
  pageLink: {
    marginTop: '1rem',
    marginBottom: '1rem',
  },
}))
