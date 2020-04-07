import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, wait } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RegistrationPage } from '../index'
import * as organizationService from '../../../services/organizations'

import { ORGANIZATION_TYPES } from '../../../constants'

const renderComponent = () => {
  const history = createMemoryHistory()

  return render(
    <Router history={history}>
      <RegistrationPage />
    </Router>
  )
}

describe('Registration Page', () => {
  beforeAll(() => (console.error = jest.fn()))
  afterEach(() => jest.clearAllMocks())

  it('should render the registration form', () => {
    const { getByText, getByTestId } = renderComponent()

    getByText('Organization Registration')
    getByText('Point of Contact')

    const registerButton = getByTestId('register-button')
    const cancelButton = getByTestId('cancel-button')

    expect(registerButton).toBeDisabled()
    expect(cancelButton).toBeEnabled()
  })

  it('should show an invalid email error', async () => {
    const { getByText, getByTestId, queryByText } = renderComponent()
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
    const { getByText, getByTestId, queryByText } = renderComponent()
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

  it('should fill out the form and submit successfully', async () => {
    const { getByTestId, getByText } = renderComponent()
    const createOrganizationSpy = jest
      .spyOn(organizationService, 'createOrganization')
      .mockResolvedValue({})
    expect(getByTestId('register-button')).toBeDisabled()

    await wait(() => {
      userEvent.type(getByTestId('org-name-input'), 'my org')
      userEvent.type(getByTestId('tax-id-input'), '5555')
      userEvent.click(getByText('Make a selection'))
      userEvent.click(getByText(ORGANIZATION_TYPES[0].name))
      userEvent.type(getByTestId('contact-name-input'), 'Jon')
      userEvent.type(getByTestId('contact-job-title-input'), 'Dentist')
      userEvent.type(getByTestId('contact-phone-input'), '555-555-55555')
      userEvent.type(getByTestId('contact-email-input'), 'jon@email.com')
    })

    await wait(() => {
      getByTestId('register-button').click()
    })

    expect(createOrganizationSpy).toHaveBeenCalledWith({
      org_name: 'my org',
      tax_id: '5555',
      sector: ORGANIZATION_TYPES[0].value,
      contact_name: 'Jon',
      contact_job_title: 'Dentist',
      contact_phone: '555-555-5555',
      contact_email: 'jon@email.com',
    })

    getByText('Thank You')
  })

  it('should show error state if submit fail', async () => {
    const { getByTestId, getByText } = renderComponent()
    jest
      .spyOn(organizationService, 'createOrganization')
      .mockRejectedValue(new Error('Error submitting form'))

    await wait(() => {
      userEvent.type(getByTestId('org-name-input'), 'my org')
      userEvent.type(getByTestId('tax-id-input'), '5555')
      userEvent.click(getByText('Make a selection'))
      userEvent.click(getByText(ORGANIZATION_TYPES[0].name))
      userEvent.type(getByTestId('contact-name-input'), 'Jon')
      userEvent.type(getByTestId('contact-job-title-input'), 'Dentist')
      userEvent.type(getByTestId('contact-phone-input'), '555-555-55555')
      userEvent.type(getByTestId('contact-email-input'), 'jon@email.com')
    })

    await wait(() => {
      getByTestId('register-button').click()
    })

    getByText('Error submitting form')
  })
})
