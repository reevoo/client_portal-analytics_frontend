import { CP_ANALYTICS_API } from 'app/js/constants/app_constants'
import { get } from 'app/js/services/auth'
import { getTableauToken } from 'app/js/services/cp_analytics_api_client'

describe('CPAnalyticsAPIClient', () => {
  it('#getTableauToken returns an object containing a token', (done) => {
    getTableauToken().then((data) => {
      expect(data.token).toEqual(jasmine.any(String))
      done()
    })
  })

  it('#get /sentisum/login returns an object containing an url', (done) => {
    get(`${CP_ANALYTICS_API}sentisum/login`).then((data) => {
      expect(data.url).toEqual(jasmine.any(String))
      done()
    })
  })
})
