import {
  changeFilter,
  getProfileAndDashboards,
  getSelectedDashboardById,
  loadTableauDashboard,
  removeDashboardView,
  saveDashboardView,
  setDefaultDashboardView,
  showDashboardView,
  exportImageDashboard,
  exportPDFDashboard,
  __RewireAPI__ as DashboardRewireAPI,
} from 'app/js/actions/dashboards'
import * as actionTypes from 'app/js/constants/action_types'
import { createMockStore } from 'tests/helpers/store_helpers'

describe('actions', () => {
  describe('getProfileAndDashboards', () => {
    const profile = { name: 'User name', client_users_accessible_dashboards: [1, 2] }
    const dashboards = [ { id: 1 }, { id: 2 } ]

    beforeEach(() => {
      const getProfileMock = () => Promise.resolve(profile)
      DashboardRewireAPI.__Rewire__('getProfile', getProfileMock)
    })

    it('successfully retrieves the user profile and the dashboards from the backend', (done) => {
      const getWorkbooksMock = () => Promise.resolve(dashboards)
      DashboardRewireAPI.__Rewire__('getWorkbooks', getWorkbooksMock)

      const store = createMockStore({
        analyticsApp: {},
        router: { params: { id: '1' } },
      })

      const expectedActions = [
        { type: actionTypes.GET_PROFILE_AND_DASHBOARDS },
        { type: actionTypes.GET_PROFILE_AND_DASHBOARDS_SUCCESS, payload: { profile, dashboards } },
      ]

      store.dispatch(getProfileAndDashboards()).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      }).then(done)
    })

    it('successfully retrieves the user profile and the dashboards from the backend, ignoring null values on the dashboards', (done) => {
      const getWorkbooksMock = () => Promise.resolve([ dashboards[0], null, dashboards[1] ])
      DashboardRewireAPI.__Rewire__('getWorkbooks', getWorkbooksMock)

      const store = createMockStore({
        analyticsApp: {},
        router: { params: { id: '1' } },
      })

      const expectedActions = [
        { type: actionTypes.GET_PROFILE_AND_DASHBOARDS },
        { type: actionTypes.GET_PROFILE_AND_DASHBOARDS_SUCCESS, payload: { profile, dashboards } },
      ]

      store.dispatch(getProfileAndDashboards()).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      }).then(done)
    })

    it('successfully retrieves the user profile and the dashboards from the backend and redirects to the first one', (done) => {
      const getWorkbooksMock = () => Promise.resolve(dashboards)
      DashboardRewireAPI.__Rewire__('getWorkbooks', getWorkbooksMock)

      const store = createMockStore({
        analyticsApp: {},
        router: { params: {} },
      })

      const expectedActions = [
        { type: actionTypes.GET_PROFILE_AND_DASHBOARDS },
        { type: actionTypes.GET_PROFILE_AND_DASHBOARDS_SUCCESS, payload: { profile, dashboards } },
        { type: '@@reduxReactRouter/historyAPI', payload: { method: 'push', args: [ { pathname: '/dashboards/1' } ] } },
      ]

      store.dispatch(getProfileAndDashboards()).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      }).then(done)
    })
  })

  describe('loadTableauDashboard', () => {
    beforeEach(() => {
      const getTableauTokenMock = () => Promise.resolve({ token: 'token' })
      DashboardRewireAPI.__Rewire__('getTableauToken', getTableauTokenMock)
    })

    it('loads a dashboard from Tableau according to the current url', (done) => {
      const createTableauAPISpy = jasmine.createSpy('createTableauAPI').and.returnValue('tableauAPI')
      DashboardRewireAPI.__Rewire__('createTableauAPI', createTableauAPISpy)

      const store = createMockStore({
        analyticsApp: {
          profile: { id: 1 },
          dashboards: [ { id: 1, views: ['test/sheets/'], name: 'Test dashboard' } ],
        },
        router: { params: { id: 1 } },
      })

      const expectedActions = [
        { type: actionTypes.GET_DASHBOARD_TOKEN },
        { type: actionTypes.GET_TABLEAU_API_FOR_DASHBOARD, payload: 'tableauAPI' },
      ]

      store.dispatch(loadTableauDashboard()).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
        expect(createTableauAPISpy).toHaveBeenCalledWith({
          userId: 1,
          availableTrkrefs: undefined,
          token: 'token',
          viewId: 'test/',
          onLoad: jasmine.any(Function),
        })
      }).then(done)
    })

    it('loads a dashboard from Tableau according to the current url and resets the previous one', (done) => {
      const createTableauAPISpy = jasmine.createSpy('createTableauAPI').and.returnValue('tableauAPI')
      DashboardRewireAPI.__Rewire__('createTableauAPI', createTableauAPISpy)

      const tableauAPISpy = jasmine.createSpyObj('tableauAPI', [ 'dispose' ])

      const store = createMockStore({
        analyticsApp: {
          profile: { id: 1 },
          dashboards: [ { id: 1, views: ['test/sheets/'], name: 'Test dashboard' } ],
          tableauAPI: tableauAPISpy,
        },
        router: { params: { id: 1 } },
      })

      const expectedActions = [
        { type: actionTypes.GET_DASHBOARD_TOKEN },
        { type: actionTypes.GET_TABLEAU_API_FOR_DASHBOARD, payload: 'tableauAPI' },
      ]

      store.dispatch(loadTableauDashboard()).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
        expect(tableauAPISpy.dispose).toHaveBeenCalled()
        expect(createTableauAPISpy).toHaveBeenCalledWith({
          userId: 1,
          availableTrkrefs: undefined,
          token: 'token',
          viewId: 'test/',
          onLoad: jasmine.any(Function),
        })
      }).then(done)
    })
  })

  describe('changeFilter', () => {
    it('sets a filter value on a dashboard', (done) => {
      const setFilterValueMock = () => Promise.resolve()
      DashboardRewireAPI.__Rewire__('setFilterValue', setFilterValueMock)

      const store = createMockStore({
        analyticsApp: {
          tableauAPI: { getWorkbook: () => {} },
          workbook: { filters: [ { name: 'filterName' } ] },
        },
      })

      const expectedActions = [
        { type: actionTypes.SET_DASHBOARD_FILTER_INIT },
        { type: actionTypes.SET_DASHBOARD_FILTER, payload: { name: 'filterName', value: 'filterValue' } },
      ]

      store.dispatch(changeFilter('filterName', 'filterValue')).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      }).then(done)
    })
  })

  describe('getSelectedDashboardById', () => {
    it('finds an existing dashboard in the list', () => {
      expect(getSelectedDashboardById([{id: 1}, {id: 2}], 2)).toEqual({id: 2})
    })

    it('returns undefined if it can\'t find the requested dashboard in the list', () => {
      expect(getSelectedDashboardById([{id: 1}, {id: 2}], 3)).not.toBeDefined()
    })
  })

  describe('showDashboardView', () => {
    it('sets a Tableau view as the currently selected one', (done) => {
      const showCustomViewMock = () => Promise.resolve()
      DashboardRewireAPI.__Rewire__('showCustomView', showCustomViewMock)

      const getParametersAndFiltersMock = () => Promise.resolve([ { name: 'filterName' } ])
      DashboardRewireAPI.__Rewire__('getParametersAndFilters', getParametersAndFiltersMock)

      const store = createMockStore({ analyticsApp: { tableauAPI: { getWorkbook: () => {} } } })

      const expectedActions = [
        { type: actionTypes.SHOW_DASHBOARD_VIEW_INIT },
        { type: actionTypes.SHOW_DASHBOARD_VIEW, payload: { filters: [ { name: 'filterName' } ], selectedView: 'viewName' } },
      ]

      store.dispatch(showDashboardView('viewName')).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      }).then(done)
    })
  })

  describe('saveDashboardView', () => {
    it('saves the current view in Tableau with the given name', (done) => {
      const saveCustomViewMock = () => Promise.resolve()
      DashboardRewireAPI.__Rewire__('saveCustomView', saveCustomViewMock)

      const store = createMockStore({ analyticsApp: { tableauAPI: { getWorkbook: () => {} } } })

      const expectedActions = [
        { type: actionTypes.ADD_DASHBOARD_VIEW, payload: 'viewName' },
      ]

      store.dispatch(saveDashboardView('viewName')).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      }).then(done)
    })
  })

  describe('setDefaultDashboardView', () => {
    it('sets the given Tableau view as the currently selected and the default one', (done) => {
      const setDefaultCustomViewMock = () => Promise.resolve()
      DashboardRewireAPI.__Rewire__('setDefaultCustomView', setDefaultCustomViewMock)

      const getParametersAndFiltersMock = () => Promise.resolve([ { name: 'filterName' } ])
      DashboardRewireAPI.__Rewire__('getParametersAndFilters', getParametersAndFiltersMock)

      const store = createMockStore({ analyticsApp: { tableauAPI: { getWorkbook: () => {} } } })

      const expectedActions = [
        {
          type: actionTypes.SET_DEFAULT_DASHBOARD_VIEW,
          payload: { filters: [ { name: 'filterName' } ], selectedView: 'viewName', defaultView: 'viewName' },
        },
      ]

      store.dispatch(setDefaultDashboardView('viewName')).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      }).then(done)
    })
  })

  describe('removeDashboardView', () => {
    it('removes the provided view from Tableau', (done) => {
      const removeCustomViewMock = () => Promise.resolve()
      DashboardRewireAPI.__Rewire__('removeCustomView', removeCustomViewMock)

      const store = createMockStore({ analyticsApp: { tableauAPI: { getWorkbook: () => {} } } })

      const expectedActions = [
        { type: actionTypes.REMOVE_DASHBOARD_VIEW, payload: 'viewName' },
      ]

      store.dispatch(removeDashboardView('viewName')).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      }).then(done)
    })
  })

  describe('exportImageDashboard', () => {
    it('calls the showExportImageDialog method in the current tableauAPI object', () => {
      const showExportImageDialogSpy = jasmine.createSpy('showExportImageDialog')
      const store = createMockStore({ analyticsApp: { tableauAPI: { showExportImageDialog: showExportImageDialogSpy } } })

      store.dispatch(exportImageDashboard())
      expect(showExportImageDialogSpy).toHaveBeenCalled()
    })
  })

  describe('exportPDFDashboard', () => {
    it('calls the showExportImageDialog method in the current tableauAPI object', () => {
      const showExportPDFDialogSpy = jasmine.createSpy('showExportPDFDialog')
      const store = createMockStore({ analyticsApp: { tableauAPI: { showExportPDFDialog: showExportPDFDialogSpy } } })

      store.dispatch(exportPDFDashboard())
      expect(showExportPDFDialogSpy).toHaveBeenCalled()
    })
  })
})
