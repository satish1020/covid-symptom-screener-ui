import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, wait } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RegistrationPage } from './index'

import { ORGANIZATION_TYPES } from '../../constants'

describe('Registration Page', () => {
  it('should render the registration form', () => {
    const history = createMemoryHistory()
    const { getByText, getByTestId } = render(
      <Router history={history}>
        <RegistrationPage />
      </Router>
    )

    getByText('Organization Registration')
    getByText('Point of Contact')

    const registerButton = getByTestId('register-button')
    const cancelButton = getByTestId('cancel-button')

    expect(registerButton).toBeDisabled()
    expect(cancelButton).toBeEnabled()
  })

  it('should show an invalid email error', async () => {
    const history = createMemoryHistory()
    const { getByText, getByTestId, queryByText } = render(
      <Router history={history}>
        <RegistrationPage />
      </Router>
    )
    const emailInput = getByTestId('contact-email-input')

    await wait(() => {
      userEvent.type(emailInput, 'foo')
    })

    getByText('e.g. user@example.com. Invalid email address')

    await wait(() => {
      userEvent.type(emailInput, 'foo@email.com')
    })

    expect(
      queryByText('e.g. user@example.com. Invalid email address')
    ).toBeNull()
    getByText('e.g. user@example.com.')
  })

  it('should show an invalid phone error', async () => {
    const history = createMemoryHistory()
    const { getByText, getByTestId, queryByText } = render(
      <Router history={history}>
        <RegistrationPage />
      </Router>
    )
    const phoneInput = getByTestId('contact-phone-input')

    await wait(() => {
      userEvent.type(phoneInput, '555-555')
    })

    getByText('e.g. 555-555-5555. Invalid phone number')

    await wait(() => {
      userEvent.type(phoneInput, '555-555-5555')
    })

    expect(queryByText('e.g. 555-555-5555. Invalid phone number')).toBeNull()
    getByText('e.g. 555-555-5555.')
  })

  it('should fill out the form and enable the register button', async () => {
    const history = createMemoryHistory()
    const { getByTestId, getByText } = render(
      <Router history={history}>
        <RegistrationPage />
      </Router>
    )

    expect(getByTestId('register-button')).toBeDisabled()

    const orgNameInput = getByTestId('org-name-input')
    const taxIdInput = getByTestId('tax-id-input')
    const contactNameInput = getByTestId('contact-name-input')
    const contactJobTitleInput = getByTestId('contact-job-title-input')
    const contactPhoneInput = getByTestId('contact-phone-input')
    const contactEmailInput = getByTestId('contact-email-input')

    await wait(() => {
      userEvent.type(orgNameInput, 'my org')
      userEvent.type(taxIdInput, '5555')
      userEvent.click(getByText('Make a selection'))
      userEvent.click(getByText(ORGANIZATION_TYPES[0].name))
      userEvent.type(contactNameInput, 'Jon')
      userEvent.type(contactJobTitleInput, 'Dentist')
      userEvent.type(contactPhoneInput, '555-555-55555')
      userEvent.type(contactEmailInput, 'jon@email.com')
    })

    expect(await getByTestId('register-button')).toBeEnabled()
  })
  // Todo: write tests for submit success/fail
})
