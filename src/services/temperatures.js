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

  const response = await axios.get(
    `${appConfig.kelvinApi}/temperatures`,
    config
  )

  return {
    results: response.data.results,
    total: response.data.total,
  }
}

export const getFormattedTemperatures = async ({
  perPage = 20,
  page = 0,
  orderBy,
  direction,
}) => {
  const { results, total } = await getTemperatures({
    perPage,
    page,
    orderBy,
    direction,
  })

  const resultsWithQuestionsAnswers = results.map((item) => {
    const questionAnswers = item.question_answers.reduce((prev, curr) => {
      const id = curr.question.id
      const answer = curr.answer

      return {
        ...prev,
        [id]: answer.toString(),
      }
    }, {})

    return {
      ...item,
      ...questionAnswers,
    }
  })

  return {
    results: resultsWithQuestionsAnswers,
    total,
  }
}

export const submitTemperatures = async (authorizationCode, temperatures) => {
  const response = await axios.post(
    `${appConfig.kelvinApi}/temperatures`,
    temperatures,
    {
      headers: {
        'x-organization-pin': authorizationCode,
      },
    }
  )

  return response.data
}
