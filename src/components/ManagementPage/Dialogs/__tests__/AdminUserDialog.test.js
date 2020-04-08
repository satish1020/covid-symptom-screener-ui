import React from 'react'
import { render, fireEvent, wait, waitForElement } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { AdminUserDialog } from '../AdminUserDialog'

import * as userService from '../../../../services/users'

import { ROLE_ADMIN } from '../../../../constants'

describe('AdminUserDialog', () => {
  const setup = () => {
    const props = {
      open: true,
      onRequestClose: jest.fn(),
      onRequestTableRefresh: jest.fn(),
    }

    const utils = render(<AdminUserDialog {...props} />)

    return {
      ...utils,
      props,
    }
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('submits an email', async () => {
    const email = 'test@gmail.com'

    const response = {
      email_address: email,
      role: ROLE_ADMIN,
      created: '2020-04-07T19:27:30.625933Z',
      created_by: email,
      last_modified: '2020-04-07T19:27:30.625933Z',
      last_modified_by: email,
    }

    const spyCreateUser = jest
      .spyOn(userService, 'createUser')
      .mockResolvedValue(response)

    const { getByTestId, props } = setup()

    const inputEmail = await waitForElement(() => getByTestId('email'))
    const form = await waitForElement(() => getByTestId('form'))

    await wait(() => {
      userEvent.type(inputEmail, email)
    })

    await wait(() => {
      fireEvent.submit(form)
    })

    expect(spyCreateUser).toHaveBeenCalledWith({
      email,
      role: ROLE_ADMIN,
    })
    expect(props.onRequestTableRefresh).toHaveBeenCalled()
    expect(props.onRequestClose).toHaveBeenCalled()
  })

  it('displays an error from the api on submit', async () => {
    const email = 'test@gmail.com'
    const errorText = 'boom!'

    console.error = jest.fn() // No need to log error to terminal

    const spyCreateUser = jest
      .spyOn(userService, 'createUser')
      .mockRejectedValue(new Error(errorText))

    const { getByTestId, getByText, props } = setup()

    const inputEmail = await waitForElement(() => getByTestId('email'))
    const form = await waitForElement(() => getByTestId('form'))

    await wait(() => {
      userEvent.type(inputEmail, email)
    })

    await wait(() => {
      fireEvent.submit(form)
    })

    getByText(errorText)

    expect(spyCreateUser).toHaveBeenCalledWith({
      email,
      role: ROLE_ADMIN,
    })
    expect(props.onRequestTableRefresh).not.toHaveBeenCalled()
    expect(props.onRequestClose).not.toHaveBeenCalled()
  })

  it('displays error text for an improper email', async () => {
    const email = 'not an email address'

    const spyCreateUser = jest.spyOn(userService, 'createUser')

    const { getByTestId, getByText, props } = setup()

    const inputEmail = await waitForElement(() => getByTestId('email'))
    const form = await waitForElement(() => getByTestId('form'))

    await wait(() => {
      userEvent.type(inputEmail, email)
    })

    await wait(() => {
      fireEvent.submit(form)
    })

    getByText('e.g. user@example.com. Invalid email address')

    expect(spyCreateUser).not.toHaveBeenCalled()
    expect(props.onRequestTableRefresh).not.toHaveBeenCalled()
    expect(props.onRequestClose).not.toHaveBeenCalled()
  })
})
