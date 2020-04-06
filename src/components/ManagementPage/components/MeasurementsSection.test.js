import React from 'react'
import { render, wait, waitForElement } from '@testing-library/react'

import { MeasurementsSection } from './MeasurementsSection'
import { DIRECTION_DESC } from '../../../constants'

import * as temperatureService from '../../../services/temperatures'

describe('MeasurementsSection', () => {
  const setup = () => {
    const data = [
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
    ]

    const fetchTemperatursSpy = jest
      .spyOn(temperatureService, 'getTemperatures')
      .mockResolvedValue({
        results: data,
        total: data.length,
      })

    const utils = render(<MeasurementsSection />)

    return {
      ...utils,
      fetchTemperatursSpy,
      data,
    }
  }

  it('renders a table', async () => {
    const {
      queryByTestId,
      getByTestId,
      getByText,
      data,
      fetchTemperatursSpy,
    } = setup()

    await waitForElement(() => getByTestId('table-progress'))
    await wait(() => expect(queryByTestId('table-progress')).toBeNull())

    expect(fetchTemperatursSpy).toHaveBeenCalledWith({
      direction: DIRECTION_DESC,
      orderBy: 'organization_id',
      page: 0,
      perPage: 20,
    })

    // table headers
    getByText('Organization')
    getByText('Location')
    getByText('Temperature')

    // table data
    getByText(data[0].organization_id)
    getByText(`Lat: ${data[0].latitude}, Lng: ${data[0].longitude}`)
    getByText(data[0].temperature.toString())
  })
})
