import * as actions from 'app/js/actions/actions.js'

describe('actions', () => {
  it('creates an action to add a toggleDrawer', () => {
    const expectedAction = {
      type: actions.TOGGLE_LEFT_HAND_NAV,
    }
    expect(actions.toggleLeftHandNav()).toEqual(expectedAction)
  })
})
