import { getWorkbooks } from 'app/js/services/tableau_gateway_api_client'

describe('TableauGatewayAPIClient', () => {
  it('#getWorkbooks returns an object containing a workbook data structure', (done) => {
    getWorkbooks(['11111111-2222-3333-4444-0000000000']).then((data) => {
      expect(Array.isArray(data)).toBeTruthy()
      expect(data[0].id).toEqual(jasmine.any(String))
      expect(data[0].name).toEqual(jasmine.any(String))
      expect(Array.isArray(data[0].views)).toBeTruthy()

      done()
    })
  })
})
