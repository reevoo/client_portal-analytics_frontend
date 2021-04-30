import { getTableauToken } from 'app/js/services/cp_analytics_api_client'

describe('CPAnalyticsAPIClient', () => {
  it('#getTableauToken returns an object containing a token', (done) => {
    getTableauToken().then((data) => {
      expect(data.token).toEqual(jasmine.any(String))
      done()
    })
  })
})
