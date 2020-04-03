import axios from 'axios'
import { appConfig } from '../config/appConfig'

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
