import fetchMock from 'fetch-mock'
import { getDashboardToken, loadDashboards, selectDashboard, initTableauDashboard, __RewireAPI__ as DashboardRewireAPI } from 'app/js/actions/dashboards'
import * as actionTypes from 'app/js/constants/action_types'
import { createMockStore } from 'tests/helpers/store_helpers'
import { CP_ANALYTICS_API, TABLEAU_HOST, TABLEAU_GATEWAY_API } from 'app/js/constants/app_constants'

describe('actions', () => {
  beforeEach(fetchMock.restore)

  describe('getDashboardToken', () => {
    it('executes the async flow with a successful ajax request', (done) => {
      fetchMock.get(`${CP_ANALYTICS_API}tableau/token`, {data: 'test_data'})

      const expectedActions = [
        {type: actionTypes.GET_DASHBOARD_TOKEN},
        {type: actionTypes.GET_DASHBOARD_TOKEN_SUCCESS, payload: {data: 'test_data'}},
      ]
      const store = createMockStore({})

      store.dispatch(getDashboardToken())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
          done()
        })
    })

    it('executes the async flow with a failing ajax request', (done) => {
      fetchMock.get(`${CP_ANALYTICS_API}tableau/token`, { status: 500, throws: 'error string' })

      const expectedActions = [
        {type: actionTypes.GET_DASHBOARD_TOKEN},
        {type: actionTypes.GET_DASHBOARD_TOKEN_ERROR, error: 'error string'},
      ]
      const store = createMockStore({})

      store.dispatch(getDashboardToken())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
          done()
        })
    })
  })

  describe('loadDashboards', () => {
    it('executes the async flow with a successful ajax request', (done) => {
      fetchMock.get(
        `${TABLEAU_GATEWAY_API}workbooks?ids[]=dashboard_1&ids[]=dashboard_2`,
        ['dashboard_1', 'dashboard_2']
      )

      const expectedActions = [
        {type: actionTypes.GET_DASHBOARDS_NAMES},
        {type: actionTypes.GET_DASHBOARDS_NAMES_SUCCESS, payload: ['dashboard_1', 'dashboard_2']},
      ]
      const store = createMockStore({router: {params: {id: '1'}}})

      store.dispatch(loadDashboards(['dashboard_1', 'dashboard_2']))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
          done()
        })
    })

    it('executes the async flow with a successful ajax request and null values on the response', (done) => {
      fetchMock.get(
        `${TABLEAU_GATEWAY_API}workbooks?ids[]=dashboard_1&ids[]=dashboard_2&ids[]=dashboard_3`,
        ['dashboard_1', null, 'dashboard_3']
      )

      const expectedActions = [
        {type: actionTypes.GET_DASHBOARDS_NAMES},
        {type: actionTypes.GET_DASHBOARDS_NAMES_SUCCESS, payload: ['dashboard_1', 'dashboard_3']},
      ]
      const store = createMockStore({router: {params: {id: '1'}}})

      store.dispatch(loadDashboards(['dashboard_1', 'dashboard_2', 'dashboard_3']))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
          done()
        })
    })

    it('executes the async flow with a failing ajax request', (done) => {
      fetchMock.get(
        `${TABLEAU_GATEWAY_API}workbooks?ids[]=dashboard_1&ids[]=dashboard_2`,
        { status: 500, throws: 'error string' }
      )

      const expectedActions = [
        {type: actionTypes.GET_DASHBOARDS_NAMES},
        {type: actionTypes.GET_DASHBOARDS_NAMES_ERROR, error: 'error string'},
      ]
      const store = createMockStore({})
      store.dispatch(loadDashboards(['dashboard_1', 'dashboard_2']))
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
          dashboard: 'dashboard_1',
        },
      ]

      const store = createMockStore({})
      store.dispatch(selectDashboard('dashboard_1'))
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  describe('initTableauDashboard', () => {
    it('dispatches the action with the passed dashboard when there is not an existing dashboard in the state', () => {
      const expectedActions = [
        {
          type: actionTypes.GET_TABLEAU_API_FOR_DASHBOARD,
          payload: jasmine.anything(),
        },
      ]
      const tableauSpy = { Viz: jasmine.createSpy('Viz') }

      DashboardRewireAPI.__Rewire__('tableau', tableauSpy)

      const store = createMockStore({ analyticsApp: {} })
      store.dispatch(initTableauDashboard('node', 'token', 'viewId', 'userId'))

      expect(store.getActions()).toEqual(expectedActions)
      expect(tableauSpy.Viz).toHaveBeenCalledWith(
        'node',
        `${TABLEAU_HOST}trusted/token/views/viewId?:embed=yes&:toolbar=no&:showShareOptions=no&:record_performance=yes&UUID=userId`,
        jasmine.any(Object)
      )
    })

    it('dispatches the action with the passed dashboard when there is an existing dashboard in the state and calls dispose on it', () => {
      const expectedActions = [
        {
          type: actionTypes.GET_TABLEAU_API_FOR_DASHBOARD,
          payload: jasmine.anything(),
        },
      ]
      const tableauSpy = { Viz: jasmine.createSpy('Viz') }

      DashboardRewireAPI.__Rewire__('tableau', tableauSpy)

      const currentTableauAPISpy = { dispose: jasmine.createSpy('dispose') }
      const store = createMockStore({ analyticsApp: { tableauAPI: currentTableauAPISpy } })
      store.dispatch(initTableauDashboard('node', 'token', 'viewId', 'userId'))

      expect(currentTableauAPISpy.dispose).toHaveBeenCalled()
      expect(store.getActions()).toEqual(expectedActions)
      expect(tableauSpy.Viz).toHaveBeenCalledWith(
        'node',
        `${TABLEAU_HOST}trusted/token/views/viewId?:embed=yes&:toolbar=no&:showShareOptions=no&:record_performance=yes&UUID=userId`,
        jasmine.any(Object)
      )
    })
  })
})
