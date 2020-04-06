import axios from 'axios'
import { appConfig } from '../config/appConfig'
import { ROLE_ADMIN } from '../constants'

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
