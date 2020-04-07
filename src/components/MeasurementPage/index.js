import React, { useState, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { CoordinateContext } from '../Shared/context/coordinateContext'
import { UserContext } from '../Shared/context/userContext'

import {
  Typography,
  Box,
  makeStyles,
  Snackbar,
  IconButton,
  Button,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import PageTitle from '../Shared/components/PageTitle'
// import SwitchInput from './SwitchInput'

import { submitTemperatures } from '../../services/temperatures'

const useStyles = makeStyles(({ spacing, buttonPrimary }) => ({
  input: {
    width: '100%',
    display: 'block',
    textAlign: 'center',
    fontSize: '6.5rem',
    fontWeight: 'bold',
    border: 'none',
    color: '#666',
    padding: spacing(2, 0),
    marginBottom: spacing(2),
  },
  questionsTitle: {
    fontWeight: 'bold',
    marginBottom: spacing(),
  },
  button: {
    ...buttonPrimary,
  },
  errorMessage: {
    backgroundColor: '#f44336',
    color: '#fff',
    padding: spacing(),
    marginBottom: spacing(2),
    borderRadius: '4px',
  },
}))

// const INITIAL_QUESTIONS_STATE = {
//   fever: false,
//   shortness_of_breath: false,
//   muscle_aches: false,
//   sore_throat: false,
//   new_cough: false,
// }

function isInvalidTemperature(temp) {
  return temp < 95 || temp > 105
}

export const MeasurementPage = () => {
  const classes = useStyles()
  const [temperature, setTemperature] = useState('')
  const [errorMessage, setErrorMessage] = useState()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [snackbarIsOpen, setSnackbarIsOpen] = useState(false)
  // const [questions, setQuestions] = useState(INITIAL_QUESTIONS_STATE)
  const [coords] = useContext(CoordinateContext)
  const [userState] = useContext(UserContext)
  const { organization } = userState
  // const organization = JSON.parse(window.localStorage.getItem('organization'))
  // const coords = JSON.parse(window.localStorage.getItem('coords'))

  if (!Boolean(organization)) {
    return <Redirect to="/authorization" />
  }

  if (!coords?.latitude || !coords?.longitude) {
    return <Redirect to="/location" />
  }

  function handleClose(_, reason) {
    if (reason === 'clickaway') {
      return
    }

    setSnackbarIsOpen(false)
  }

  function handleChange(e) {
    setSnackbarIsOpen(false)
    setErrorMessage('')
    setTemperature(e.target.value)
  }

  async function handleSubmit() {
    const { latitude, longitude } = coords

    try {
      setIsSubmitting(true)
      const temperatures = [
        {
          temperature,
          latitude,
          longitude,
          timestamp: new Date(Date.now()).toISOString(),
        },
      ]

      await submitTemperatures(organization.authorization_code, temperatures)
      setTemperature('')
      // setQuestions(INITIAL_QUESTIONS_STATE)
      setSnackbarIsOpen(true)
      setIsSubmitting(false)
    } catch (e) {
      setErrorMessage(e?.message ?? 'An error occurred')
      console.error(e)
      setIsSubmitting(false)
    }
  }

  // function toggleSwitch(e) {
  //   const { name } = e.target
  // setQuestions((prevState) => ({
  //   ...prevState,
  //   [name]: !prevState[name],
  // }))
  // }

  const submitIsDisabled = isInvalidTemperature(temperature) || isSubmitting

  return (
    <>
      <PageTitle title="Assessment Submission" />
      {organization && (
        <Typography>
          Organization Name: <strong>{organization.org_name}</strong>
        </Typography>
      )}
      <Box width="100%" height="100%">
        <input
          className={classes.input}
          type="tel"
          onChange={handleChange}
          value={temperature}
          placeholder="00.0"
          data-testid="temperature-input"
        />
      </Box>
      <Box marginBottom={2}>
        <Typography variant="h6" className={classes.questionsTitle}>
          In the last 7 days, have you had:
        </Typography>
        {/* <SwitchInput
          label="A fever of more than 100.4"
          id="fever"
          onChange={toggleSwitch}
          value={questions.fever}
        />
        <SwitchInput
          label="Shortness of breath"
          id="shortness_of_breath"
          onChange={toggleSwitch}
          value={questions.shortness_of_breath}
        />
        <SwitchInput
          label="Muscle Aches"
          id="muscle_aches"
          onChange={toggleSwitch}
          value={questions.muscle_aches}
        />
        <SwitchInput
          label="Sore throat"
          id="sore_throat"
          onChange={toggleSwitch}
          value={questions.sore_throat}
        />
        <SwitchInput
          label="A new cough"
          id="new_cough"
          onChange={toggleSwitch}
          value={questions.new_cough}
        /> */}
      </Box>
      <Box>
        {errorMessage && (
          <div data-testid="error-message" className={classes.errorMessage}>
            {errorMessage}
          </div>
        )}
        <Button
          className={classes.button}
          fullWidth
          variant="contained"
          onClick={handleSubmit}
          disabled={submitIsDisabled}
          data-testid="submit-button"
        >
          Submit
        </Button>
      </Box>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={snackbarIsOpen}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Success! Entry submitted"
        action={
          <>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      />
    </>
  )
}
