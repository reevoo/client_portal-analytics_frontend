import * as actions from 'app/js/actions/dashboards'
import * as actionTypes from 'app/js/constants/action_types'
import { createMockStore, fakeNextRequest } from 'tests/helpers/store_helpers'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { CP_ANALYTICS_HOST, TABLEAU_HOST, TABLEAU_GATEWAY_API } from 'app/js/constants/app_constants'
let mock

describe('actions', () => {
  beforeEach(()=>{
    mock = new MockAdapter(axios);
  })
  describe('getDashboardToken', () => {
    it('executes the async flow with a successful ajax request', (done) => {
      mock.onGet(`${CP_ANALYTICS_HOST}/api/v1/tableau/token`).reply(200, 'test_data')

      const expectedActions = [
        {type: actionTypes.GET_DASHBOARD_TOKEN},
        {type: actionTypes.GET_DASHBOARD_TOKEN_SUCCESS, payload: 'test_data'},
      ]
      const store = createMockStore({})

      store.dispatch(actions.getDashboardToken())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
          done()
        })
    })

    it('executes the async flow with a failing ajax request', (done) => {
      mock.onGet(`${CP_ANALYTICS_HOST}/api/v1/tableau/token`).reply(500, 'error string')

      const expectedActions = [
        {type: actionTypes.GET_DASHBOARD_TOKEN},
        {type: actionTypes.GET_DASHBOARD_TOKEN_ERROR, error: 'error string'},
      ]
      const store = createMockStore({})

      store.dispatch(actions.getDashboardToken())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
          done()
        })
    })
  })

  describe('loadDashboards', () => {
    it('executes the async flow with a successful ajax request', (done) => {
      mock
        .onGet(`${TABLEAU_GATEWAY_API}/workbooks?ids[]=dashboard_1&ids[]=dashboard_2`)
        .reply(200, ['dashboard_1', 'dashboard_2'])

      const expectedActions = [
        {type: actionTypes.GET_DASHBOARDS_NAMES},
        {type: actionTypes.GET_DASHBOARDS_NAMES_SUCCESS, payload: ['dashboard_1', 'dashboard_2']},
      ]
      const store = createMockStore({})

      store.dispatch(actions.loadDashboards(['dashboard_1', 'dashboard_2']))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
          done()
        })
    })

    it('executes the async flow with a failing ajax request', (done) => {
      mock
        .onGet(`${TABLEAU_GATEWAY_API}/workbooks?ids[]=dashboard_1&ids[]=dashboard_2`)
        .reply(500, 'error string')

      const expectedActions = [
        {type: actionTypes.GET_DASHBOARDS_NAMES},
        {type: actionTypes.GET_DASHBOARDS_NAMES_ERROR, error: 'error string'},
      ]
      const store = createMockStore({})
      store.dispatch(actions.loadDashboards(['dashboard_1', 'dashboard_2']))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
          done()
        })
    })
  })

  describe('selectDashboard', () => {
    it('dispatches the action with the passed dashboard', () => {
      const expectedActions = [
        {
          type: actionTypes.SELECT_DASHBOARD,
          dashboard: 'dashboard_1'
        }
      ]

      const store = createMockStore({})
      store.dispatch(actions.selectDashboard('dashboard_1'))
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
