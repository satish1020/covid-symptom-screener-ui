import React from 'react'

import { render, fireEvent, wait } from '@testing-library/react'

import { AuthorizationPage } from '../index'

import { UserContext } from '../../Shared/context/userContext'
import * as organizationService from '../../../services/organizations'
import { ROLE_USER, ROLE_ADMIN } from '../../../constants'

describe('AuthorizationPage', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const organization = {
    tax_id: '111',
    org_name: 'test org A',
    contact_name: 'Rose Smith',
    contact_email: 'testy@email.com',
    contact_job_title: 'Engineer',
    contact_phone: '(111) 111-1111',
    approval_status: 'APPROVED',
    sector: 'OTHER_PRIVATE_BUSINESS',
    id: 'id',
    authorization_code: 'ab123',
    created: '2020-04-06T17:25:38.302490Z',
    created_by: 'test@gmail.com',
    last_modified: '2020-04-06T17:57:18.500301Z',
    last_modified_by: 'test@gmail.com',
  }

  const setup = ({ role }) => {
    const userState = {
      loggedIn: true,
      userRole: {
        role,
      },
    }
    const userActions = {
      setOrganization: jest.fn(),
    }

    const utils = render(
      <UserContext.Provider value={[userState, userActions]}>
        <AuthorizationPage />
      </UserContext.Provider>
    )

    return {
      ...utils,
      userActions,
    }
  }

  it('it renders links for a non-admin user', async () => {
    const { getByText, getByTestId, queryByText } = setup({
      role: ROLE_USER,
    })

    getByText('Submit')
    getByTestId('organization-registration-link')
    expect(queryByText('Admin Portal')).toBeNull()
  })

  it('it renders links for an admin user', async () => {
    const { getByText, getByTestId } = setup({
      role: ROLE_ADMIN,
    })

    getByText('Submit')
    getByTestId('organization-registration-link')
    getByText('Admin Portal')
  })

  it('calls userActions.setOrganization with the organization response', async () => {
    const spyGetOrganizationForAuthCode = jest
      .spyOn(organizationService, 'getOrganizationForAuthCode')
      .mockResolvedValue(organization)

    const { getByText, getByTestId, userActions } = setup({
      role: ROLE_USER,
    })

    const input = getByTestId('org-auth-code')
    const submitBtn = getByText('Submit')

    fireEvent.change(input, {
      target: { value: organization.authorization_code },
    })
    fireEvent.click(submitBtn)

    expect(spyGetOrganizationForAuthCode).toHaveBeenCalledWith(
      organization.authorization_code
    )

    await wait()

    expect(userActions.setOrganization).toHaveBeenCalledWith(organization)
  })

  it('sets an error message for an invalid authorization code', async () => {
    const invalidAuthCode = 'fail'

    const spyGetOrganizationForAuthCode = jest
      .spyOn(organizationService, 'getOrganizationForAuthCode')
      .mockResolvedValue(undefined)

    const { getByText, getByTestId, userActions } = setup({
      role: ROLE_USER,
    })

    const input = getByTestId('org-auth-code')
    const submitBtn = getByText('Submit')

    fireEvent.change(input, {
      target: { value: invalidAuthCode },
    })
    fireEvent.click(submitBtn)

    expect(spyGetOrganizationForAuthCode).toHaveBeenCalledWith(invalidAuthCode)

    await wait()

    expect(userActions.setOrganization).not.toHaveBeenCalled()

    getByText('Invalid Authorization Code')
  })

  it('sets an error message when the organizationService.organizationService method returns an error', async () => {
    const spyGetOrganizationForAuthCode = jest
      .spyOn(organizationService, 'getOrganizationForAuthCode')
      .mockRejectedValue(new Error('Boom!'))

    console.error = jest.fn() // No need to log the error to the terminal

    const { getByText, getByTestId, userActions } = setup({
      role: ROLE_USER,
    })

    const input = getByTestId('org-auth-code')
    const submitBtn = getByText('Submit')

    fireEvent.change(input, {
      target: { value: organization.authorization_code },
    })
    fireEvent.click(submitBtn)

    expect(spyGetOrganizationForAuthCode).toHaveBeenCalledWith(
      organization.authorization_code
    )

    await wait()

    expect(userActions.setOrganization).not.toHaveBeenCalled()

    getByText('Boom!')
  })
})
