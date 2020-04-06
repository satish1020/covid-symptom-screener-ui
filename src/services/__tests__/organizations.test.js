import axios from 'axios'

import * as organizationService from '../organizations'

import { DIRECTION_ASC } from '../../constants'
import { appConfig } from '../../config/appConfig'

jest.mock('axios')

describe('organizations service', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('gets a list of organizations', async () => {
    const params = {
      page: 0,
      perPage: 1,
      orderBy: 'org_name',
      direction: DIRECTION_ASC,
    }

    const approvalStatus = undefined

    const results = [{ org_name: 'orgName' }]
    const total = results.length

    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: { results, total } })
    )

    const response = await organizationService.getOrganizations(params, {
      approvalStatus,
    })
    expect(response).toEqual({ results, total })
    expect(axios.get).toHaveBeenCalledWith(
      `${appConfig.kelvinApi}/organizations`,
      {
        params: {
          size: params.perPage,
          sort: `${params.orderBy},${params.direction}`,
          page: params.page,
        },
      }
    )
  })

  it('gets a list of organizations by approval_status', async () => {
    const params = {
      page: 0,
      perPage: 1,
      orderBy: 'org_name',
      direction: DIRECTION_ASC,
    }

    const approvalStatus = 'APPROVED'

    const results = [{ org_name: 'orgName', approval_status: approvalStatus }]
    const total = results.length

    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: { results, total } })
    )

    const response = await organizationService.getOrganizations(params, {
      approvalStatus,
    })
    expect(response).toEqual({ results, total })
    expect(axios.get).toHaveBeenCalledWith(
      `${appConfig.kelvinApi}/organizations`,
      {
        params: {
          size: params.perPage,
          sort: `${params.orderBy},${params.direction}`,
          page: params.page,
          approval_status: approvalStatus,
        },
      }
    )
  })
})
