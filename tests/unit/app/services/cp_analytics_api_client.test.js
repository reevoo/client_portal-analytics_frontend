import fetchMock from 'fetch-mock'
import Cookies from 'js-cookie'
import { CP_ANALYTICS_API } from 'app/js/constants/app_constants'
import { loginToSentisum } from 'app/js/services/cp_analytics_api_client'

describe('CpAnalyticsApiClient', () => {
  beforeEach(fetchMock.restore)

  describe('#loginToSentisum', () => {
    describe('when request success', () => {
      let mockTab = {}

      it('opens new tab and assign url', (done) => {
        spyOn(window, 'open').and.returnValue(mockTab)
        fetchMock.get(`${CP_ANALYTICS_API}sentisum/login`, '{"url":"https://sentisum/login_url"}')

        loginToSentisum().then((response) => {
          expect(mockTab.location).toEqual('https://sentisum/login_url')
          done()
        })
      })
    })

    describe('when request fails', () => {
      let mockTab = { close: () => {} }

      beforeEach(() => {
        spyOn(window, 'open').and.returnValue(mockTab)
        spyOn(window, 'alert')
      })

      it('close tab', (done) => {
        spyOn(mockTab, 'close')

        fetchMock.get(`${CP_ANALYTICS_API}sentisum/login`, 404)

        loginToSentisum().then((response) => {
          expect(mockTab.location).not.toBeDefined()
          expect(mockTab.close).toHaveBeenCalled()
          done()
        })
      })

      it('alert login failed', (done) => {
        fetchMock.get(`${CP_ANALYTICS_API}sentisum/login`, 404)

        loginToSentisum().then((response) => {
          expect(window.alert).toHaveBeenCalledWith("Login failed")
          done()
        })
      })
    })
  })
})
