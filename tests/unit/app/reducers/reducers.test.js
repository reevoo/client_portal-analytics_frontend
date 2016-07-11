import analyticsApp from 'app/js/reducers/reducers.js'
import * as actions from 'app/js/actions/actions.js'

describe('reducers', () => {
  it('returns the initial state', () => {
    expect(analyticsApp(undefined, {})).toEqual({ leftHandNavVisible: true })
  })
})
