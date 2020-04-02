import axios from 'axios'

import { ACCESS_TOKEN } from '../constants'

export const configureHttpInterceptor = () => {
  axios.interceptors.request.use(
    (config) => {
      let accessToken = window.localStorage.getItem(ACCESS_TOKEN)

      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`
      }

      config.headers['Content-Type'] = 'application/json'
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // intercept all incoming responses
  axios.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      // TODO: handle 401 statuses
      return Promise.reject(error)
    }
  )
}
