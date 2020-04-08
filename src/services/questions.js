import axios from 'axios'
import { appConfig } from '../config/appConfig'

/**
 * { id: string, display_value: string, status: ENABLED|DISABLED }
 */
export async function getQuestions(status) {
  const questionStatus =
    status === 'ENABLED' || status === 'DISABLED' ? status : undefined

  const config = {
    params: {
      status: questionStatus,
    },
  }

  const response = await axios.get(`${appConfig.kelvinApi}/questions`, config)
  return response.data
}
