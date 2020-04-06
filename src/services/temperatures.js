/* eslint-disable no-unused-vars */
import axios from 'axios'

import { getPageable } from './pageable'
import { appConfig } from '../config/appConfig'

export const getTemperatures = async ({
  perPage = 20,
  page = 0,
  orderBy,
  direction,
}) => {
  const params = getPageable({ perPage, page, orderBy, direction })

  const config = {
    params,
  }

  // const response = await axios.get(
  //   `${appConfig.kelvinApi}/temperatures`,
  //   config
  // )

  // return {
  //   results: response.data.results,
  //   total: response.data.total,
  // }

  const mockPromise = () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            results: [
              {
                id: 'id1',
                organization_id: 'orgId1',
                temperature: 101.2,
                user_id: 'userId1',
                latitude: 44.977753,
                longitude: -93.265015,
                timestamp: '2020-04-04T19:31:22.109Z',
                created: '2020-04-04T19:31:22.109Z',
                created_by: 'createdBy1',
                last_modified: '2020-04-04T19:31:22.109Z',
                last_modified_by: 'lastModifiedBy1',
              },
              {
                id: 'id2',
                organization_id: 'orgId2',
                temperature: 98.6,
                user_id: 'userId2',
                latitude: 45.569981,
                longitude: 96.436028,
                timestamp: '2020-04-05T19:31:22.109Z',
                created: '2020-04-05T19:31:22.109Z',
                created_by: 'createBy2',
                last_modified: '2020-04-04T19:31:22.109Z',
                last_modified_by: 'lastModifiedBy2',
              },
            ],
            total: 2,
          },
        })
      })
    })

  return mockPromise().then((response) => ({
    results: response.data.results,
    total: response.data.total,
  }))
}

export const submitTemperatures = async (authorizationCode, temperatures) => {
  const response = await axios.post(
    `${appConfig.kelvinApi}/temperatures`,
    temperatures,
    {
      headers: {
        'x-authorization-code': authorizationCode,
      },
    }
  )

  return response.data
}
