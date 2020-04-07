import axios from 'axios'

import * as questionsService from '../questions'

import { appConfig } from '../../config/appConfig'

jest.mock('axios')

describe('questions service', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('gets a list of questions', async () => {
    const results = [{ id: '1', display_value: 'question one' }]

    axios.get.mockImplementationOnce(() => Promise.resolve({ data: results }))

    const response = await questionsService.getQuestions()
    expect(response).toEqual(results)
    expect(axios.get).toHaveBeenCalledWith(`${appConfig.kelvinApi}/questions`)
  })
})
