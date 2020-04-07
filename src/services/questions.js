import axios from 'axios'
import { appConfig } from '../config/appConfig'

/**
 * { id: string, display_value: string, status: ENABLED|DISABLED }
 */
export async function getQuestions() {
  const response = await axios.get(`${appConfig.kelvinApi}/questions`)
  return response.data
}
