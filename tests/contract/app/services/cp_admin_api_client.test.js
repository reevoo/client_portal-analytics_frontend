import { getProfile } from 'app/js/services/cp_admin_api_client'

describe('CPAdminAPIClient', () => {
  it('#getProfile returns an object containing a user profile', (done) => {
    getProfile().then((data) => {
      expect(data.id).toEqual(jasmine.any(String))
      expect(data.email).toEqual(jasmine.any(String))
      expect(Array.isArray(data.client_users_accessible_dashboards)).toBeTruthy()

      done()
    })
  })
})
