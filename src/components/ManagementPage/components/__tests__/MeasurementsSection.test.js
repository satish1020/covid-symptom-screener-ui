import React from 'react'
import { render, wait } from '@testing-library/react'

import { MeasurementsSection } from '../MeasurementsSection'
import { DIRECTION_DESC } from '../../../../constants'

import * as temperatureService from '../../../../services/temperatures'
import * as questionService from '../../../../services/questions'

describe('MeasurementsSection', () => {
  const setup = () => {
    const temperatueData = [
      {
        id: 'id1',
        organization_id: 'orgId1',
        organization_name: 'orgName',
        temperature: 101.2,
        user_id: 'userId1',
        latitude: 44.977753,
        longitude: -93.265015,
        question_answers: [
          {
            question: {
              id: 'question1',
              display_value: 'Question 1',
              status: 'ENABLED',
            },
            answer: true,
          },
        ],
        question1: 'true',
        timestamp: '2020-04-04T19:31:22.109Z',
        created: '2020-04-04T19:31:22.109Z',
        created_by: 'createdBy1',
        last_modified: '2020-04-04T19:31:22.109Z',
        last_modified_by: 'lastModifiedBy1',
      },
    ]

    const questionData = [
      {
        key: temperatueData[0].question_answers[0].question.id,
        label: temperatueData[0].question_answers[0].question.display_value,
        hasSort: false,
      },
    ]

    const fetchTemperatursSpy = jest
      .spyOn(temperatureService, 'getFormattedTemperatures')
      .mockResolvedValue({
        results: temperatueData,
        total: temperatueData.length,
      })

    const fetchTableFieldsByQuestionSpy = jest
      .spyOn(questionService, 'getTableFieldsByQuestion')
      .mockResolvedValue(questionData)

    const utils = render(<MeasurementsSection />)

    return {
      ...utils,
      fetchTemperatursSpy,
      fetchTableFieldsByQuestionSpy,
      temperatueData,
    }
  }

  it('renders a table', async () => {
    const {
      getByText,
      temperatueData,
      fetchTemperatursSpy,
      fetchTableFieldsByQuestionSpy,
    } = setup()

    await wait()

    expect(fetchTableFieldsByQuestionSpy).toHaveBeenCalled()

    expect(fetchTemperatursSpy).toHaveBeenCalledWith({
      direction: DIRECTION_DESC,
      orderBy: 'created',
      page: 0,
      perPage: 20,
    })

    // table headers
    getByText('Organization')
    getByText('Location')
    getByText('Temperature')
    getByText('Question 1')
    getByText('Created On')

    // table data
    getByText(temperatueData[0].organization_name)
    getByText(
      `Lat: ${temperatueData[0].latitude}, Lng: ${temperatueData[0].longitude}`
    )
    getByText(temperatueData[0].temperature.toString())
    getByText('true')
  })
})
