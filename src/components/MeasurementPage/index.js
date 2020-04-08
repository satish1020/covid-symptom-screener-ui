import React, { useState, useContext, useEffect } from 'react'
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
import SwitchInput from './SwitchInput'

import { submitTemperatures } from '../../services/temperatures'
import { getQuestions } from '../../services/questions'

import { ENABLED } from '../../constants'

const FORM_STATE = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUBMITTING: 'submitting',
}

const useStyles = makeStyles(({ spacing, buttonPrimary }) => ({
  tempLabel: {
    fontSize: '1.2rem',
  },
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

function isInvalidTemperature(temp) {
  return temp < 95 || temp > 105
}

function mergeQuestionAnswers(questions, answers) {
  return questions.map((q) => ({
    question: q,
    answer: answers[q.id],
  }))
}

export default function resetQuestionsAndAnswers(questions) {
  return questions.reduce((acc, curr) => {
    acc[curr.id] = false
    return acc
  }, {})
}

export const MeasurementPage = () => {
  const classes = useStyles()
  const [temperature, setTemperature] = useState('')
  const [errorMessage, setErrorMessage] = useState()
  const [snackbarIsOpen, setSnackbarIsOpen] = useState(false)
  const [questions, setQuestions] = useState([])
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState()
  const [coords] = useContext(CoordinateContext)
  const [userState] = useContext(UserContext)
  const [formState, setFormState] = useState(FORM_STATE.IDLE)
  const { organization } = userState

  const fetchQuestions = async () => {
    setFormState(FORM_STATE.LOADING)
    const response = await getQuestions(ENABLED)

    setQuestionsAndAnswers(resetQuestionsAndAnswers(response))
    setQuestions(
      response.map(({ id, display_value, status }) => ({
        id,
        display_value,
        status,
      }))
    )
    setFormState(FORM_STATE.IDLE)
  }

  const missingOrg = !Boolean(organization)
  const missingCoords = coords?.latitude == null || coords?.longitude == null

  useEffect(() => {
    if (missingOrg || missingCoords) return
    fetchQuestions()
  }, [missingOrg, missingCoords])

  if (missingOrg) {
    return <Redirect to="/authorization" />
  }

  if (missingCoords) {
    return <Redirect to="/location" />
  }

  function handleClose(_, reason) {
    if (reason === 'clickaway') {
      return
    }

    setSnackbarIsOpen(false)
  }

  function handleChange(e) {
    const value = e.target.value

    const result = []

    if (value && value.length) {
      const firstValue = e.target.value[0]
      for (let i = 0; i < value.length; i++) {
        let curr = value[i]

        if (i === 2 && firstValue === '9') {
          result.push('.')
        } else if (i === 3 && firstValue === '1') {
          result.push('.')
        }

        if (/[0-9]/.test(curr)) {
          if (
            (firstValue === '9' && result.length < 4) ||
            (firstValue === '1' && result.length < 5)
          ) {
            result.push(curr)
          }
        }
      }
    }

    setSnackbarIsOpen(false)
    setErrorMessage('')
    setTemperature(result.join(''))
  }

  async function handleSubmit() {
    const { latitude, longitude } = coords

    try {
      setFormState(FORM_STATE.SUBMITTING)

      const temperatures = [
        {
          temperature: Number(temperature),
          latitude,
          longitude,
          question_answers: mergeQuestionAnswers(
            questions,
            questionsAndAnswers
          ),
          timestamp: new Date(Date.now()).toISOString(),
        },
      ]

      await submitTemperatures(organization.authorization_code, temperatures)
      setTemperature('')
      setQuestionsAndAnswers(resetQuestionsAndAnswers(questions))
      setSnackbarIsOpen(true)
    } catch (e) {
      setErrorMessage(e?.message ?? 'An error occurred')
    } finally {
      setFormState(FORM_STATE.IDLE)
    }
  }

  function toggleSwitch(e) {
    const { id } = e.target
    setQuestionsAndAnswers((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }))
  }

  const submitIsDisabled =
    isInvalidTemperature(temperature) || formState === FORM_STATE.SUBMITTING

  return (
    <>
      <PageTitle title="Assessment Submission" />
      {organization && (
        <Typography>
          Organization Name: <strong>{organization.org_name}</strong>
        </Typography>
      )}
      <Box width="100%" marginTop={2}>
        <label className={classes.tempLabel} htmlFor="temperature">
          Temperature
        </label>
        <input
          className={classes.input}
          id="temperature"
          name="temperature"
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
        {formState !== FORM_STATE.LOADING &&
          questions.length > 0 &&
          questions.map(({ id, display_value }) => (
            <SwitchInput
              key={id}
              label={display_value}
              id={id}
              onChange={toggleSwitch}
              value={questionsAndAnswers[id]}
            />
          ))}
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
