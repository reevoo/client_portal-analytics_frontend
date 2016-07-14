import axios from 'axios'
import Auth from 'app/js/services/auth.js'
import Cookies from 'js-cookie'
import { Promise } from 'es6-promise'

describe('Auth', () => {
  beforeEach(() => {
    jasmine.Ajax.install()
  })

  afterEach(() => {
    jasmine.Ajax.uninstall()
  })

  describe('init', () => {
    describe('basic ajax call setup', () => {
      it('add authorization cookie to request headers', (done) => {
        Cookies.set('accessToken', 'secretToken')
        jasmine.Ajax.stubRequest('/foo').andReturn({status: 200})

        Auth.init()

        axios('/foo').then(() => {
          let request = jasmine.Ajax.requests.mostRecent()
          expect(request.requestHeaders.Authorization).toEqual('secretToken')
          done()
        })
      })
    })

    describe('when accessToken is invalid', () => {
      beforeEach(() => {
        let routeUtils = { redirectTo: () => Promise.resolve() }

        let AuthRewireAPI = Auth.__RewireAPI__
        AuthRewireAPI.__Rewire__('routeUtils', routeUtils)

        Cookies.set('refreshToken', 'secretRefreshToken')

        jasmine.Ajax.stubRequest('/unauthorized').andReturn({status: 401})
        jasmine.Ajax.stubRequest('http://test.com/api/v1/api_session/refresh').andReturn({
          responseText: '{"access_token":"NewAccessToken"}',
        })

        Auth.init()
      })

      it('call refresh token API endpoint with refresh token from cookie', (done) => {
        axios.get('/unauthorized').then(() => {
          let request = jasmine.Ajax.requests.at(1)

          expect(request.url).toEqual('http://test.com/api/v1/api_session/refresh')
          expect(request.method).toEqual('POST')
          expect(request.data()).toEqual({ refresh_token: 'secretRefreshToken' })

          done()
        })
      })

      it('set new access token to cookie', (done) => {
        axios.get('/unauthorized').then(() => {
          expect(Cookies.get('accessToken')).toEqual('NewAccessToken')
          done()
        })
      })

      it('recall previous request', (done) => {
        axios.get('/unauthorized').then(() => {
          let request = jasmine.Ajax.requests.at(4)
          expect(request.url).toEqual('/unauthorized')
          done()
        })
      })

      it('restart request maximum 5 times', (done) => {
        spyOn(axios, 'request').and.callThrough()

        axios.get('/unauthorized').then(() => {
          expect(axios.request.calls.count()).toEqual(5)
          done()
        })
      })
    })

    describe('when refreshToken is invalid', () => {
      it('call routeUtils.redirectTo with login url', (done) => {
        let routeUtils = { redirectTo: jasmine.createSpy('redirectTo') }
        let AuthRewireAPI = Auth.__RewireAPI__
        AuthRewireAPI.__Rewire__('routeUtils', routeUtils)

        jasmine.Ajax.stubRequest('/unauthorized').andReturn({status: 401})
        jasmine.Ajax.stubRequest('http://test.com/api/v1/api_session/refresh').andReturn({
          status: 400,
        })

        Auth.init()
        axios.get('/unauthorized')

        setTimeout(() => {
          expect(routeUtils.redirectTo).toHaveBeenCalledWith(
            'http://test.com/#/auth/sign_in?return_url=http://test.com/analytics'
          )
          done()
        }, 1)
      })
    })
  })
})
