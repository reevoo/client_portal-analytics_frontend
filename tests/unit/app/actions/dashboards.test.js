import * as actions from 'app/js/actions/dashboards'
import * as actionTypes from 'app/js/constants/action_types'
import { createMockStore, fakeNextRequest } from 'tests/helpers/store_helpers'

describe('actions', () => {
  describe('getDashboardToken', () => {
    it('executes the async flow with a successful ajax request', (done) => {
      fakeNextRequest({data: 'test_data'})

      const expectedActions = [
        {type: actionTypes.GET_DASHBOARD_TOKEN},
        {type: actionTypes.GET_DASHBOARD_TOKEN_SUCCESS, response: {data: 'token_1'}},
      ]
      const store = createMockStore({})

      store.dispatch(actions.getDashboardToken())
        .then(() => {expect(store.getActions()).toEqual(expectedActions)})
      done()
    })
  })
})
