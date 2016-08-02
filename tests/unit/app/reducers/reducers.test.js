/* global describe, it, expect, jasmine */
import { analyticsApp } from 'app/js/reducers/reducers.js'
import * as actionTypes from 'app/js/constants/action_types'

describe('reducers', () => {
  let initialState = {
    leftHandNavVisible: true,
    headerModulesVisible: false,
    accessibleModules: [],
    profile: null,
    dashboards: [],
    selectedDashboard: null,
    token: null,
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
            leftHandNavVisible: false
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
            leftHandNavVisible: true
          }
        )
      })
    })
  })

  describe('SET_PROFILE', () => {
    it('adds the profile to the state', () => {
      expect(
        analyticsApp(
          {},
          {
            type: actionTypes.SET_PROFILE,
            payload: {data: 'test_data'}
          }
        )
      ).toEqual(
        {
          profile: {data: 'test_data'}
        }
      )
    })
  })

  describe('GET_DASHBOARDS_NAMES_SUCCESS', () => {
    it('adds the dashboards to the state and selects the first dashboard', () => {
      expect(
        analyticsApp(
          {},
          {
            type: actionTypes.GET_DASHBOARDS_NAMES_SUCCESS,
            payload: ['dashboard_1', 'dashboard_2']
          }
        )
      ).toEqual(
        {
          dashboards: ['dashboard_1', 'dashboard_2'],
          selectedDashboard: 'dashboard_1',
        }
      )
    })

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

  describe('GET_DASHBOARD_TOKEN_SUCCESS', () => {
    it('adds the token to the state', () => {
      expect(
        analyticsApp(
          {},
          {
            type: actionTypes.GET_DASHBOARD_TOKEN_SUCCESS,
            payload: {token: 'token_1'}
          }
        )
      ).toEqual(
        {
          token: 'token_1'
        }
      )
    })
  })

  describe('SELECT_DASHBOARD', () => {
    it('adds the selected dashboard to the state', () => {
      expect(
        analyticsApp(
          {},
          {
            type: actionTypes.SELECT_DASHBOARD,
            dashboard: {name: 'dashboard_1'}
          }
        )
      ).toEqual(
        {
          selectedDashboard: {name: 'dashboard_1'},
        }
      )
    })
  })
})

