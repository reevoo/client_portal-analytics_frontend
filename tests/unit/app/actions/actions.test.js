import * as actions from 'app/js/actions/actions.js'
import * as actionTypes from 'app/js/constants/action_types'

describe('actions', () => {
  it('creates an action to add a toggleDrawer', () => {
    const expectedAction = {
      type: actionTypes.TOGGLE_LEFT_HAND_NAV,
    }
    expect(actions.toggleLeftHandNav()).toEqual(expectedAction)
  })
})
