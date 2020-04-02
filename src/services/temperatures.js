import axios from 'axios'
import appConfig from '../config/appConfig'

export async function submitTemperatures(authorizationCode, temperatures) {
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
