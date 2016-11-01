import { analyticsApp } from 'app/js/reducers/reducers.js'
import * as actionTypes from 'app/js/constants/action_types'

describe('reducers', () => {
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
            payload: { workbook: { filters: [] } },
          }
        )
      ).toEqual({ workbook: { filters: [] } })
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
