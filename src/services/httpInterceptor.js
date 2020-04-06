import axios from 'axios'

import { TOKEN_ID } from '../constants'

export const configureHttpInterceptor = () => {
  axios.interceptors.request.use(
    (config) => {
      let tokenId = window.localStorage.getItem(TOKEN_ID)

      if (tokenId) {
        config.headers['Authorization'] = tokenId
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
      if (error.response) {
        const code = error.response.status
        if (code === 401) {
          window.localStorage.removeItem(TOKEN_ID)
          window.location.assign('/')
        }
      }
      return Promise.reject(error)
    }
  )
}
