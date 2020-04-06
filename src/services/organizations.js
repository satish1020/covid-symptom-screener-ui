import axios from 'axios'

import { getPageable } from './pageable'
import { appConfig } from '../config/appConfig'

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

  if (response.data.results?.length !== 0) {
    return response.data.results[0]
  }

  return undefined
}

export async function getOrganizations({
  perPage = 20,
  page = 0,
  orderBy,
  direction,
}) {
  const params = getPageable({ perPage, page, orderBy, direction })

  const config = {
    params,
  }
  const response = await axios.get(
    `${appConfig.kelvinApi}/organizations`,
    config
  )

  if (response.data) {
    return {
      results: response.data.results,
      total: response.data.total,
    }
  }

  return undefined
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
