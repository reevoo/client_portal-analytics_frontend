import { analyticsApp, ui } from 'app/js/reducers/reducers.js'
import * as actionTypes from 'app/js/constants/action_types'

describe('reducers', () => {
  describe('analyticsApp', () => {
    let initialState = {
      leftHandNavVisible: true,
      headerModulesVisible: false,
      accessibleModules: [],
      profile: null,
      dashboards: [],
    }

    it('returns the initial state', () => {
      expect(analyticsApp(undefined, {})).toEqual(initialState)
    })

    it('returns the current state if action type is not defined', () => {
      expect(
        analyticsApp(
          {leftHandNavVisible: true},
          {type: {actions: undefined}}
        )
      ).toEqual(
        {leftHandNavVisible: true}
      )
    })
    describe('TOGGLE_LEFT_HAND_NAV', () => {
      describe('when the left hand nav is open', () => {
        it('closes the left hand nav', () => {
          expect(
            analyticsApp(
              {leftHandNavVisible: true},
              {type: actionTypes.TOGGLE_LEFT_HAND_NAV}
            )
          ).toEqual(
            {
              leftHandNavVisible: false,
            }
          )
        })
      })

      describe('when the left hand nav is closed', () => {
        it('opens the left hand nav', () => {
          expect(
            analyticsApp(
              {leftHandNavVisible: false},
              {type: actionTypes.TOGGLE_LEFT_HAND_NAV}
            )
          ).toEqual(
            {
              leftHandNavVisible: true,
            }
          )
        })
      })
    })

    describe('GET_PROFILE_AND_DASHBOARDS_SUCCESS', () => {
      it('adds the profile to the state', () => {
        expect(
          analyticsApp(
            {},
            {
              type: actionTypes.GET_PROFILE_AND_DASHBOARDS_SUCCESS,
              payload: {
                profile: {data: 'test_data'},
                dashboards: [{name: '1'}, {name: '2'}, {name: '3'}],
              },
            }
          )
        ).toEqual(
          {
            profile: {data: 'test_data'},
            dashboards: [{name: '1'}, {name: '2'}, {name: '3'}],
          }
        )
      })
    })

    describe('SHOW_HEADER_MODULES', () => {
      it('orders the items appropriately', () => {
        let unorderedModules = ['reevoo_admin', 'vetting', 'analytics', 'fast_response', 'help', 'admin']
        let orderedModules = analyticsApp(
          undefined,
          {
            type: actionTypes.SHOW_HEADER_MODULES,
            payload: unorderedModules,
          }
        ).accessibleModules

        expect(
          orderedModules.map(m => m.name)
        ).toEqual(
          ['Admin', 'Analytics', 'Fast Response', 'Reevoo Admin', 'Vetting', 'Help & FAQ']
        )
      })
    })

    describe('SET_WORKBOOK_VALUES', () => {
      it('adds the workbook data to the state', () => {
        expect(
          analyticsApp(
            {},
            {
              type: actionTypes.SET_WORKBOOK_VALUES,
              payload: { filters: [], views: [], defaultView: 'viewName' },
            }
          )
        ).toEqual({ workbook: { filters: [], views: [], selectedView: 'viewName', defaultView: 'viewName' } })
      })
    })

    describe('SET_DASHBOARD_FILTER', () => {
      it('sets a filter value in the state', () => {
        expect(
          analyticsApp(
            { workbook: { filters: [ { name: 'filterName', allowedValues: [ 'foo', 'bar' ], selectedValue: 'foo' } ] } },
            {
              type: actionTypes.SET_DASHBOARD_FILTER,
              payload: { name: 'filterName', value: 'bar' },
            }
          )
        ).toEqual(
          { workbook: { filters: [ { name: 'filterName', allowedValues: [ 'foo', 'bar' ], selectedValue: 'bar' } ] } }
        )
      })
    })

    describe('ADD_DASHBOARD_VIEW', () => {
      it('adds a new view to the state', () => {
        expect(
          analyticsApp(
            { workbook: { views: [ 'view1' ] } },
            {
              type: actionTypes.ADD_DASHBOARD_VIEW,
              payload: 'view2',
            }
          )
        ).toEqual({ workbook: { views: [ 'view1', 'view2' ], selectedView: 'view2' } })
      })
    })

    describe('REMOVE_DASHBOARD_VIEW', () => {
      it('removes a view from the state', () => {
        expect(
          analyticsApp(
            { workbook: { views: [ 'view1', 'view2' ], selectedView: 'view2', defaultView: 'view2' } },
            {
              type: actionTypes.REMOVE_DASHBOARD_VIEW,
              payload: 'view1',
            }
          )
        ).toEqual({ workbook: { views: [ 'view2' ], selectedView: 'view2', defaultView: 'view2' } })
      })

      it('removes the selected view from the state', () => {
        expect(
          analyticsApp(
            { workbook: { views: [ 'view1', 'view2' ], selectedView: 'view1', defaultView: 'view2' } },
            {
              type: actionTypes.REMOVE_DASHBOARD_VIEW,
              payload: 'view1',
            }
          )
        ).toEqual({ workbook: { views: [ 'view2' ], selectedView: null, defaultView: 'view2' } })
      })

      it('removes the default view from the state', () => {
        expect(
          analyticsApp(
            { workbook: { views: [ 'view1', 'view2' ], selectedView: 'view2', defaultView: 'view1' } },
            {
              type: actionTypes.REMOVE_DASHBOARD_VIEW,
              payload: 'view1',
            }
          )
        ).toEqual({ workbook: { views: [ 'view2' ], selectedView: 'view2', defaultView: null } })
      })
    })

    describe('SET_DEFAULT_DASHBOARD_VIEW', () => {
      it('sets the default view in the state', () => {
        expect(
          analyticsApp(
            { workbook: { views: [ 'view1', 'view2' ], selectedView: 'view2', defaultView: 'view2' } },
            {
              type: actionTypes.SET_DEFAULT_DASHBOARD_VIEW,
              payload: { filters: [], selectedView: 'view1', defaultView: 'view1' },
            }
          )
        ).toEqual({ workbook: { filters: jasmine.any(Array), views: [ 'view1', 'view2' ], selectedView: 'view1', defaultView: 'view1' } })
      })
    })

    describe('SHOW_DASHBOARD_VIEW', () => {
      it('sets the selected view in the state', () => {
        expect(
          analyticsApp(
            { workbook: { views: [ 'view1', 'view2' ], selectedView: 'view2', defaultView: 'view2' } },
            {
              type: actionTypes.SHOW_DASHBOARD_VIEW,
              payload: { filters: [], selectedView: 'view1' },
            }
          )
        ).toEqual({ workbook: { filters: jasmine.any(Array), views: [ 'view1', 'view2' ], selectedView: 'view1', defaultView: 'view2' } })
      })
    })

    describe('GET_TABLEAU_API_FOR_DASHBOARD', () => {
      it('adds a tableauAPI object to the state', () => {
        expect(
          analyticsApp(
            {},
            {
              type: actionTypes.GET_TABLEAU_API_FOR_DASHBOARD,
              payload: { dispose: 'fake method' },
            }
          )
        ).toEqual({ tableauAPI: {dispose: 'fake method'} })
      })
    })
  })

  describe('ui', () => {
    let initialState = {
      loadingDashboardValues: false,
    }

    it('returns the initial state', () => {
      expect(ui(undefined, {})).toEqual(initialState)
    })

    describe('SET_DASHBOARD_FILTER_INIT', () => {
      it('sets the dashboard as loading', () => {
        expect(ui({}, { type: actionTypes.SET_DASHBOARD_FILTER_INIT }))
          .toEqual({ loadingDashboardValues: true })
      })
    })

    describe('SET_DASHBOARD_FILTER', () => {
      it('sets the dashboard as loading', () => {
        expect(ui({}, { type: actionTypes.SET_DASHBOARD_FILTER }))
          .toEqual({ loadingDashboardValues: false })
      })
    })

    describe('SHOW_DASHBOARD_VIEW_INIT', () => {
      it('sets the dashboard as loading', () => {
        expect(ui({}, { type: actionTypes.SHOW_DASHBOARD_VIEW_INIT }))
          .toEqual({ loadingDashboardValues: true })
      })
    })

    describe('SHOW_DASHBOARD_VIEW', () => {
      it('sets the dashboard as loading', () => {
        expect(ui({}, { type: actionTypes.SHOW_DASHBOARD_VIEW }))
          .toEqual({ loadingDashboardValues: false })
      })
    })
  })
})
