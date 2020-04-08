import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Typography,
  Button,
  Box,
} from '@material-ui/core'
import useStyles from './styles'
import { Formik, Form } from 'formik'
import { createOrganization } from '../../../../services/organizations'
import {
  isInvalidEmail,
  isInvalidPhoneNumber,
} from '../../../../services/validation'
import { MaskedPhoneInput } from '../PhoneField'

import { useHistory } from 'react-router-dom'
import { ORGANIZATION_TYPES } from '../../../../constants'

const INITIAL_FORM_STATE = {
  org_name: '',
  tax_id: '',
  contact_name: '',
  contact_job_title: '',
  contact_phone: '',
  contact_email: '',
  sector: '',
}

const RegistrationForm = ({ setIsRegistered }) => {
  const classes = useStyles()
  const [errorMessage, setErrorMessage] = useState('')
  const history = useHistory()

  async function handleFormSubmit(values, { setSubmitting }) {
    setSubmitting(true)
    setErrorMessage('')

    try {
      await createOrganization(values)
      setSubmitting(false)
      setIsRegistered(true)
    } catch (e) {
      setErrorMessage(e?.message ?? 'An error occurred')
      console.error(e)
      setSubmitting(false)
    }
  }

  function validateForm(values) {
    const { contact_email, contact_phone } = values
    let errors = {}

    if (contact_email && isInvalidEmail(contact_email)) {
      errors.contact_email = 'Invalid email address'
    }

    if (contact_phone && isInvalidPhoneNumber(contact_phone)) {
      errors.contact_phone = 'Invalid phone number'
    }
    return errors
  }

  function handleCancelClick() {
    history.push('/')
  }

  return (
    <>
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
            <Form>
              <Box marginBottom={2}>
                <Typography
                  gutterBottom
                  variant="body2"
                  className={submitIsDisabled ? classes.error : ''}
                >
                  * All fields are required
                </Typography>
              </Box>
              <Box>
                <TextField
                  name="org_name"
                  id="org_name"
                  label="Organization Name"
                  onChange={handleChange}
                  value={values.org_name}
                  fullWidth
                  className={classes.inputField}
                  inputProps={{
                    'data-testid': 'org-name-input',
                  }}
                />
                <FormControl fullWidth className={classes.inputField}>
                  <InputLabel id="sector_label" htmlFor="sector">Industry</InputLabel>
                  <Select
                    name="sector"
                    labelId="sector_label"
                    value={values.sector}
                    onChange={handleChange}
                    inputProps={{
                      id: 'sector',
                      'data-testid': 'sector',
                    }}
                    displayEmpty
                    renderValue={(item) => {
                      if (!item) return 'Make a selection'

                      const name =
                        ORGANIZATION_TYPES.find((org) => org.value === item)
                          ?.name ?? ''
                      return name
                    }}
                  >
                    {ORGANIZATION_TYPES.map((item) => (
                      <MenuItem key={item.value} value={item.value}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  name="tax_id"
                  id="tax_id"
                  label="MN Tax ID"
                  helperText="To be used for verification"
                  onChange={handleChange}
                  value={values.tax_id}
                  fullWidth
                  className={classes.inputField}
                  inputProps={{
                    'data-testid': 'tax-id-input',
                  }}
                />
              </Box>
              <Box marginBottom={2}>
                <Typography className={classes.sectionTitle} gutterBottom>
                  Point of Contact
                </Typography>
                <TextField
                  name="contact_name"
                  id="contact_name"
                  label="Name"
                  helperText="First and Last Name"
                  onChange={handleChange}
                  value={values.contact_name}
                  fullWidth
                  className={classes.inputField}
                  inputProps={{
                    'data-testid': 'contact-name-input',
                  }}
                />
                <TextField
                  name="contact_job_title"
                  id="contact_job_title"
                  label="Job Title"
                  onChange={handleChange}
                  value={values.contact_job_title}
                  fullWidth
                  className={classes.inputField}
                  inputProps={{
                    'data-testid': 'contact-job-title-input',
                  }}
                />
                <TextField
                  name="contact_phone"
                  id="contact_phone"
                  label="Phone Number"
                  helperText={`e.g. 555-555-5555. ${
                    errors.contact_phone || ''
                  }`}
                  onChange={handleChange}
                  value={values.contact_phone}
                  fullWidth
                  error={Boolean(errors.contact_phone)}
                  className={classes.inputField}
                  InputProps={{
                    inputComponent: MaskedPhoneInput,
                  }}
                  inputProps={{
                    'data-testid': 'contact-phone-input',
                    type: 'tel',
                  }}
                />
                <TextField
                  name="contact_email"
                  id="contact_email"
                  label="Email"
                  helperText={`e.g. user@example.com. ${
                    errors.contact_email || ''
                  }`}
                  onChange={handleChange}
                  value={values.contact_email}
                  fullWidth
                  error={Boolean(errors.contact_email)}
                  className={classes.inputField}
                  inputProps={{
                    'data-testid': 'contact-email-input',
                    type: 'email',
                  }}
                />
              </Box>
              <Box>
                {/* Generic error message until we finalize a way to handle errors */}
                {errorMessage && (
                  <div
                    data-testid="error-message"
                    className={classes.errorMessage}
                  >
                    {errorMessage}
                  </div>
                )}
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  className={classes.submitButton}
                  size="large"
                  disabled={submitIsDisabled}
                  data-testid="register-button"
                >
                  Register
                </Button>
                <Button
                  type="button"
                  size="large"
                  fullWidth
                  onClick={handleCancelClick}
                  data-testid="cancel-button"
                >
                  Cancel
                </Button>
              </Box>
            </Form>
          )
        }}
      </Formik>
    </>
  )
}

export default RegistrationForm

RegistrationForm.propTypes = {
  setIsRegistered: PropTypes.func.isRequired,
}
