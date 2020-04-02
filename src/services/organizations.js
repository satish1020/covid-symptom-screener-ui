import appConfig from '../config/appConfig'
import axios from 'axios'

export async function getOrganizationForAuthCode(authorizationCode) {
  const requestConfig = {
    params: {
      authorization_code: authorizationCode,
    },
  }

  const response = await axios.get(
    `${appConfig.kelvinApi}/organizations`,
    requestConfig
  )

  if (response.data.results) {
    return response.data.results[0]
  }

  return null
}

export async function createOrganization(organization) {
  const response = await axios.post(
    `${appConfig.kelvinApi}/organizations`,
    organization
  )

  return response.data
}

export async function saveOrganization(id, organization) {
  const response = await axios.put(
    `${appConfig.kelvinApi}/organizations/${id}`,
    organization
  )

  return response.data
}
