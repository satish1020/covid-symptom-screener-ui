/* eslint-disable no-undef */
import React, { useState } from 'react'
import {
  makeStyles,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  TextField,
  Typography,
} from '@material-ui/core'
import { Formik, Form } from 'formik'

import CloseIcon from '@material-ui/icons/Close'

import { isInvalidEmail } from '../../../services/validation'
import { createUser } from '../../../services/users'

import { ROLE_ADMIN } from '../../../constants'

const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: '2rem',
  },
  dialogTitle: {
    padding: '0px',
  },
  closeButton: {
    position: 'absolute',
    top: '0',
    right: '0',
  },
  modalTitle: {
    fontSize: '1.25rem',
    fontWeight: '900',
  },
  dialogTable: {
    MuiTableCell: {
      padding: '0px',
    },
  },
  tableCell: {
    padding: '0.5rem',
    borderBottom: '0',
  },
  boldLabel: {
    fontWeight: '700',
  },
  spacerRow: {
    height: '2rem',
  },
  primaryAction: {
    ...theme.buttonPrimary,
    color: '#FFF',
  },
}))

const INITIAL_FORM_STATE = {
  email: '',
}

export const AdminUserDialog = ({
  open,
  onRequestClose,
  onRequestTableRefresh,
}) => {
  const classes = useStyles()

  const [errorMessage, setErrorMessage] = useState('')

  const validateForm = (values) => {
    const { email } = values
    const errors = {}

    if (email && isInvalidEmail(email)) {
      errors.email = 'Invalid email address'
    }

    return errors
  }

  const handleFormSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true)
    setErrorMessage('')

    try {
      await createUser({
        email: values.email,
        role: ROLE_ADMIN,
      })
      onRequestTableRefresh()
      onRequestClose()
    } catch (e) {
      setErrorMessage(e?.message ?? 'An error occurred')
      console.error(e)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog
      fullWidth
      classes={{ paperScrollPaper: classes.dialog }}
      open={open}
    >
      <DialogTitle classes={{ root: classes.dialogTitle }}>
        <div>
          <Typography className={classes.modalTitle}>
            Add a new admin user
          </Typography>
        </div>
        <IconButton
          className={classes.closeButton}
          onClick={() => {
            onRequestClose(false)
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Formik
        initialValues={INITIAL_FORM_STATE}
        validate={validateForm}
        onSubmit={handleFormSubmit}
      >
        {({ values, isSubmitting, handleChange, errors }) => {
          const submitIsDisabled =
            isSubmitting ||
            Object.values(values).some((x) => x === '') ||
            Object.keys(errors).length > 0
          return (
            <Form data-testid="form">
              <DialogContent>
                <TextField
                  name="email"
                  label="Email"
                  helperText={`e.g. user@example.com. ${errors.email || ''}`}
                  onChange={handleChange}
                  value={values.email}
                  fullWidth
                  className={classes.inputField}
                  inputProps={{
                    'data-testid': 'email',
                  }}
                />
                <Box>
                  {/* Generic error message */}
                  {errorMessage && (
                    <div className={classes.errorMessage}>{errorMessage}</div>
                  )}
                </Box>
              </DialogContent>
              <DialogActions>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={submitIsDisabled}
                >
                  Submit
                </Button>
              </DialogActions>
            </Form>
          )
        }}
      </Formik>
    </Dialog>
  )
}
