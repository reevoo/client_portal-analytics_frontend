import fetchMock from 'fetch-mock'
import Cookies from 'js-cookie'
import { get, __RewireAPI__ as AuthRewireAPI } from 'app/js/services/auth'
import { CP_ADMIN_API, CP_ANALYTICS_URL, LOGIN_URL } from 'app/js/constants/app_constants'

describe('Auth', () => {
  beforeEach(fetchMock.restore)

  describe('basic ajax call setup', () => {
    describe('#get', () => {
      it('adds authorization cookie to request headers', (done) => {
        localStorage.setItem('accessToken', 'secretToken')
        fetchMock.get('/foo', 'value')

        get('/foo').then((response) => {
          expect(fetchMock.lastCall()[0].headers.get('Authorization')).toEqual('secretToken')
          done()
        })

        localStorage.removeItem('accessToken')
      })
    })
  })

  describe('when accessToken is invalid', () => {
    let fetchMockCalls = []
    beforeEach(() => {
      const routeUtils = { redirectTo: () => { Promise.resolve() } }
      AuthRewireAPI.__Rewire__('routeUtils', routeUtils)

      Cookies.set('refreshToken', 'secretRefreshToken')

      fetchMockCalls = []
      const registerCalls = (response) => (url) => {
        fetchMockCalls.push(url)
        return response
      }

      fetchMock.get('/unauthorized', registerCalls({status: 401}))
      fetchMock.post(`${CP_ADMIN_API}api_session/refresh`, registerCalls({
        access_token: 'NewAccessToken',
        refresh_token: 'secretRefreshToken'
      }))
    })

    it('call refresh token API endpoint with refresh token from cookie', (done) => {
      get('/unauthorized').then(() => {
        const request = fetchMock.calls().matched[1][0]

        expect(request.url).toEqual(`${CP_ADMIN_API}api_session/refresh`)
        expect(request.method).toEqual('POST')
        request.json().then((body) => {
          expect(body).toEqual({ refresh_token: 'secretRefreshToken' })
          done()
        })
      })
    })

    it('set new access token to cookie', (done) => {
      get('/unauthorized').then(() => {
        expect(localStorage.getItem('accessToken')).toEqual('NewAccessToken')
        done()
      })
    })

    it('recall previous request', (done) => {
      get('/unauthorized').then(() => {
        expect(fetchMockCalls[2].url).toEqual('/unauthorized')
        done()
      })
    })

    it('restart request maximum 5 times', (done) => {
      get('/unauthorized').then(() => {
        expect(fetchMockCalls.filter((call) => call.url === '/unauthorized').length).toEqual(5)
        done()
      })
    })
  })

  describe('when refreshToken is invalid', () => {
    it('call routeUtils.redirectTo with login url', (done) => {
      const routeUtils = { redirectTo: jasmine.createSpy('redirectTo') }
      AuthRewireAPI.__Rewire__('routeUtils', routeUtils)

      fetchMock.get('/unauthorized', { status: 401 })
      fetchMock.post(`${CP_ADMIN_API}api_session/refresh`, { status: 400 })

      get('/unauthorized').then(() => {
        expect(routeUtils.redirectTo).toHaveBeenCalledWith(`${LOGIN_URL}?return_url=${CP_ANALYTICS_URL}`)
        done()
      })
    })
  })
})
