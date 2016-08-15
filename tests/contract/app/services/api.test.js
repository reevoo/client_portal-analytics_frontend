import Api from 'app/js/services/api'
import { Promise } from 'es6-promise'  // eslint-disable-line

describe('Api service', () => {
  it('getTableauToken returns an object containing a token', (done) => {
    Api.getTableauToken().then((result) => {
      const data = result.data

      expect(data.token).toEqual(jasmine.any(String))

      done()
    })
  })

  it('getWorkbooks returns an object containing a workbook data structure', (done) => {
    Api.getWorkbooks(['11111111-2222-3333-4444-0000000000']).then((result) => {
      const data = result.data

      expect(Array.isArray(data)).toBeTruthy()
      expect(data[0].id).toEqual(jasmine.any(String))
      expect(data[0].name).toEqual(jasmine.any(String))
      expect(Array.isArray(data[0].views)).toBeTruthy()

      done()
    })
  })
})
