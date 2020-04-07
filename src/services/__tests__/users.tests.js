import axios from 'axios'

import * as userService from '../users'

import { DIRECTION_ASC, ROLE_ADMIN } from '../../constants'
import { appConfig } from '../../config/appConfig'

jest.mock('axios')

describe('users service', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('returns a list of users', async () => {
    const params = {
      page: 0,
      perPage: 20,
      orderBy: 'email_address',
      direction: DIRECTION_ASC,
    }
    const response = {
      data: {
        results: [
          {
            email_address: 'test@test.com',
            role: 'ADMIN',
            created: '2020-04-07T19:27:30.625933Z',
            created_by: 'test@gmail.com',
            last_modified: '2020-04-07T19:27:30.625933Z',
            last_modified_by: 'test@gmail.com',
          },
        ],
        total: 1,
      },
    }

    axios.get.mockImplementationOnce(() => Promise.resolve(response))

    const res = await userService.getUsers(params)
    expect(res).toEqual(response.data)
    expect(axios.get).toHaveBeenCalledWith(
      `${appConfig.kelvinApi}/user-roles`,
      {
        params: {
          size: params.perPage,
          sort: `${params.orderBy},${params.direction}`,
          page: params.page,
        },
      }
    )
  })

  it('create a user', async () => {
    const email = 'test@test.com'

    const response = {
      data: {
        email_address: test,
        role: ROLE_ADMIN,
        created: '2020-04-07T19:27:30.625933Z',
        created_by: 'test@gmail.com',
        last_modified: '2020-04-07T19:27:30.625933Z',
        last_modified_by: 'test@gmail.com',
      },
    }

    axios.post.mockImplementationOnce(() => Promise.resolve(response))

    const res = await userService.createUser({
      email,
      role: ROLE_ADMIN,
    })
    expect(res).toEqual(response.data)
    expect(axios.post).toHaveBeenCalledWith(
      `${appConfig.kelvinApi}/user-roles`,
      {
        email_address: email,
        role: ROLE_ADMIN,
      }
    )
  })

  it('deletes a user', async () => {
    const email = 'test@test.com'

    const response = {
      data: {},
    }
    axios.delete.mockImplementationOnce(() => Promise.resolve(response))

    await userService.deleteUser({
      email,
    })

    expect(axios.delete).toHaveBeenCalledWith(
      `${appConfig.kelvinApi}/user-roles?email_address=${encodeURIComponent(
        email
      )}`
    )
  })
})
