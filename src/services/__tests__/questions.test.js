import axios from 'axios'

import * as questionsService from '../questions'

import { appConfig } from '../../config/appConfig'
import { ENABLED } from '../../constants'

jest.mock('axios')

describe('questions service', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('gets a list of questions', async () => {
    const results = [{ id: '1', display_value: 'question one' }]

    axios.get.mockImplementationOnce(() => Promise.resolve({ data: results }))

    const response = await questionsService.getQuestions(ENABLED)
    expect(response).toEqual(results)
    expect(axios.get).toHaveBeenCalledWith(`${appConfig.kelvinApi}/questions`, {
      params: {
        status: ENABLED,
      },
    })
  })

  it('should make the request without params', async () => {
    const results = [{ id: '1', display_value: 'question one' }]

    axios.get.mockImplementationOnce(() => Promise.resolve({ data: results }))

    await questionsService.getQuestions()
    expect(axios.get).toHaveBeenCalledWith(`${appConfig.kelvinApi}/questions`, {
      params: {
        status: undefined,
      },
    })
  })
})
