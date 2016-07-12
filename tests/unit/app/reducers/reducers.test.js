import analyticsApp from 'app/js/reducers/reducers.js'
import * as actions from 'app/js/actions/actions.js'

describe('reducers', () => {
  it('returns the initial state', () => {
    expect(analyticsApp(undefined, {})).toEqual({ leftHandNavVisible: true })
  })

  it('returns the current state if action type is not defined', () => {
    expect(
      analyticsApp(
        {leftHandNavVisible: true},
        {type: { actions: undefined }}
      )
    ).toEqual(
      {leftHandNavVisible: true}
    )
  })

  describe('when the left hand nav is open', () => {
    it('closes the left hand nav', () => {
      expect(
        analyticsApp(
          {leftHandNavVisible: true},
          {type: actions.TOGGLE_LEFT_HAND_NAV}
        )
      ).toEqual(
        {leftHandNavVisible: false}
      )
    })
  })

  describe('when the left hand nav is closed', () => {
    it('opens the left hand nav', () => {
      expect(
        analyticsApp(
          {leftHandNavVisible: false},
          {type: actions.TOGGLE_LEFT_HAND_NAV}
        )
      ).toEqual(
        {leftHandNavVisible: true}
      )
    })
  })
})
