import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import { TOKEN_ID } from '../../constants'
import { configureHttpInterceptor } from '../httpInterceptor'

describe('httpInterceptor', () => {
  let mock
  beforeAll(() => {
    mock = new MockAdapter(axios)
  })

  afterEach(() => {
    mock.reset()
  })

  afterAll(() => {
    mock.restore()
  })

  it('attaches Authorization header when its set', () => {
    window.localStorage.setItem(TOKEN_ID, 'token')
    configureHttpInterceptor()

    const spy = jest.spyOn(axios, 'get')
    mock.onGet('/organizations').reply(200, {})

    return axios.get('/organizations').then((response) => {
      expect(spy).toHaveBeenCalledWith('/organizations')
      expect(response.config.headers.Authorization).toEqual('token')
    })
  })

  it('should handle displaying 401 errors', () => {
    const spy = jest.spyOn(axios, 'get')
    mock.onGet('/organizations').reply(401, {})

    return axios.get('/organizations').catch(() => {
      expect(spy).toHaveBeenCalledWith('/organizations')
      expect(window.localStorage.getItem(TOKEN_ID)).toBeNull()
    })
  })
})
