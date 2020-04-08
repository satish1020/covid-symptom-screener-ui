import React from 'react'
import { render, fireEvent, wait, waitForElement } from '@testing-library/react'

import { AdminUserSection } from '../AdminUserSection'
import { DIRECTION_DESC, ROLE_ADMIN } from '../../../../constants'

import * as userService from '../../../../services/users'

describe('AdminUserSection', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const setup = () => {
    const data = [
      {
        email_address: 'test@test.com',
        role: ROLE_ADMIN,
        created: '2020-04-07T19:27:30.625933Z',
        created_by: 'test@gmail.com',
        last_modified: '2020-04-07T19:27:30.625933Z',
        last_modified_by: 'test@gmail.com',
      },
    ]

    const spyGetUsers = jest.spyOn(userService, 'getUsers').mockResolvedValue({
      results: data,
      total: data.length,
    })

    const spyDeleteUser = jest.spyOn(userService, 'deleteUser')

    const utils = render(<AdminUserSection />)

    return {
      ...utils,
      spyGetUsers,
      spyDeleteUser,
      data,
    }
  }

  it('renders a table', async () => {
    const { queryByTestId, getByTestId, getByText, data, spyGetUsers } = setup()

    await waitForElement(() => getByTestId('table-progress'))
    await wait(() => expect(queryByTestId('table-progress')).toBeNull())

    expect(spyGetUsers).toHaveBeenCalledWith({
      direction: DIRECTION_DESC,
      orderBy: 'email_address',
      page: 0,
      perPage: 20,
    })

    // table headers
    getByText('Email')

    // table data
    getByText(data[0].email_address)
  })

  it('calls userService.deleteUser when the delete icon is clicked and the user confirms the', async () => {
    window.confirm = jest.fn(() => true)

    const { getByTestId, queryByTestId, spyDeleteUser, data } = setup()

    await waitForElement(() => getByTestId('table-progress'))
    await wait(() => expect(queryByTestId('table-progress')).toBeNull())

    const deleteBtn = getByTestId('delete')

    fireEvent.click(deleteBtn)

    expect(spyDeleteUser).toHaveBeenCalledWith({
      email: data[0].email_address,
    })
  })

  it('does not call userService.deleteUser when the delete icon is clicked and the user does not confirm the action', async () => {
    window.confirm = jest.fn(() => false)

    const { getByTestId, queryByTestId, spyDeleteUser } = setup()

    await waitForElement(() => getByTestId('table-progress'))
    await wait(() => expect(queryByTestId('table-progress')).toBeNull())

    const deleteBtn = getByTestId('delete')

    fireEvent.click(deleteBtn)

    expect(spyDeleteUser).not.toHaveBeenCalled()
  })
})
