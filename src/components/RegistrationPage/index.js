import React, { useState } from 'react'
import PageTitle from '../Shared/components/PageTitle'
import { Box, Typography, Button } from '@material-ui/core'
import RegistrationForm from './components/RegistrationForm'
import { useHistory } from 'react-router-dom'

export const RegistrationPage = () => {
  const [isRegistered, setRegistered] = useState(false)
  const history = useHistory()

  function handleHomeClick() {
    history.push('/')
  }

  return isRegistered ? (
    <>
      <PageTitle title="Thank You" />
      <Box paddingLeft={2} paddingRight={2}>
        <Box marginBottom={2}>
          <Typography gutterBottom>
            We have received your application and hope to respond within the
            next 1-3 business days.
          </Typography>
        </Box>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleHomeClick}
        >
          Back to Home
        </Button>
      </Box>
    </>
  ) : (
    <>
      <PageTitle title="Organization Registration" />
      <Box paddingLeft={2} paddingRight={2}>
        <Box marginBottom={2}>
          <Typography gutterBottom>
            Please complete all fields as the main point of contact and submit
            the form.
          </Typography>
        </Box>
        <RegistrationForm setIsRegistered={setRegistered} />
      </Box>
    </>
  )
}
