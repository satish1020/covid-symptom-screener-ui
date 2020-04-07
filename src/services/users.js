import axios from 'axios'

import { appConfig } from '../config/appConfig'
import { ROLE_ADMIN } from '../constants'
import { getPageable } from './pageable'

export async function getUsers({ perPage = 20, page = 0, orderBy, direction }) {
  const params = getPageable({ perPage, page, orderBy, direction })

  const config = {
    params,
  }

  const response = await axios.get(`${appConfig.kelvinApi}/user-roles`, config)

  return {
    results: response.data.results,
    total: response.data.total,
  }
}

export async function createUser({ email, role }) {
  const payload = {
    email_address: email,
    role,
  }

  const response = await axios.post(
    `${appConfig.kelvinApi}/user-roles`,
    payload
  )

  return response.data
}

export async function deleteUser({ email }) {
  const response = await axios.delete(
    `${appConfig.kelvinApi}/user-roles?email_address=${encodeURIComponent(
      email
    )}`
  )

  return response.data
}

/**
 * UserRole domain
 *   {
 *    email_address: string
 *    role: ADMIN/USER
 *   }
 */
export async function currentUserRole() {
  const response = await axios.get(`${appConfig.kelvinApi}/user-roles/current`)
  return response.data
}

export function isRoleAdmin(userRole) {
  return userRole && userRole.role === ROLE_ADMIN
}
