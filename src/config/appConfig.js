import axios from 'axios'
import localAppConfig from './localConfiguration'
export function appConfigGenerator(isLocal = false) {
  let appConfig
  if (isLocal) {
    appConfig = Promise.resolve(localAppConfig)
  } else { // TODO : implement other environments
    appConfig = axios.get('/app_environment').then(response => {
      return response.data
    })
  }

  return appConfig
}

const appConfig = appConfigGenerator(process.env.REACT_APP_LOCAL)
export default function() {
  return appConfig
}
