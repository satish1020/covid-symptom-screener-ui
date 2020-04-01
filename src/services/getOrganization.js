import axios from 'axios';
import appConfig from '../config/appConfig'

export default async function getOrganization(orgId) {
    const requestConfig = {
        params: {
          organization_id: orgId
        }
      }
      const config = await appConfig()
    
      const response = await axios.get(
        `${config.kelvinUrl}organizations`,
        requestConfig
      )
    
      return response.data
}