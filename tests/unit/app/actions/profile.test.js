import * as actions from 'app/js/actions/profile'
import * as actionTypes from 'app/js/constants/action_types'
import { createMockStore } from 'tests/helpers/store_helpers'
import fetchMock from 'fetch-mock'
// import axios from 'axios'
// import MockAdapter from 'axios-mock-adapter'
import { CP_ADMIN_API } from 'app/js/constants/app_constants'
// let mock

const PROFILE_URL = `${CP_ADMIN_API}profile`

describe('actions', () => {
  beforeEach(fetchMock.restore)

  describe('fetchProfile', () => {
    it('executes the async flow with a successful ajax request', (done) => {
      fetchMock.get(PROFILE_URL, {value: 'test_data'})

      const expectedActions = [
        {type: actionTypes.GET_PROFILE},
        {type: actionTypes.GET_PROFILE_SUCCESS, payload: {value: 'test_data'}},
      ]
      const store = createMockStore({})

      store.dispatch(actions.fetchProfile())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
          done()
        })
    })

    it('executes the async flow with a failing ajax request', (done) => {
      fetchMock.get(PROFILE_URL, {status: 500, throws: 'error string'})

      const expectedActions = [
        {type: actionTypes.GET_PROFILE},
        {type: actionTypes.GET_PROFILE_ERROR, error: 'error string'},
      ]
      const store = createMockStore({})

      store.dispatch(actions.fetchProfile())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
          done()
        })
    })
  })
})
