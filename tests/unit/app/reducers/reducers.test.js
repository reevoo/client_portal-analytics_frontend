/* global describe, it, expect, jasmine */
import analyticsApp from 'app/js/reducers/reducers.js'
import * as actions from 'app/js/actions/actions.js'

describe('reducers', () => {
  let initialState = {
    leftHandNavVisible: true,
    headerModulesVisible: false,
    accessibleModules: [],
  }

  it('returns the initial state', () => {
    expect(analyticsApp(undefined, {})).toEqual(initialState)
  })

  it('returns the current state if action type is not defined', () => {
    expect(
      analyticsApp(
        {leftHandNavVisible: true},
        {type: { actions: undefined }}
      )
    ).toEqual(
      {leftHandNavVisible: true}
    )
  })

  describe('the left hand nav toggle', () => {
    describe('when the left hand nav is open', () => {
      it('closes the left hand nav', () => {
        expect(
          analyticsApp(
            {leftHandNavVisible: true},
            {type: actions.TOGGLE_LEFT_HAND_NAV}
          )
        ).toEqual(
          {leftHandNavVisible: false}
        )
      })
    })

    describe('when the left hand nav is closed', () => {
      it('opens the left hand nav', () => {
        expect(
          analyticsApp(
            {leftHandNavVisible: false},
            {type: actions.TOGGLE_LEFT_HAND_NAV}
          )
        ).toEqual(
          {leftHandNavVisible: true}
        )
      })
    })
  })

  describe('showing the header modules dropdown', () => {
    it('only requested modules are shown', () => {
      expect(
        analyticsApp(
          {},
          {type: actions.SHOW_HEADER_MODULES, payload: ['admin']}
        )
      ).toEqual(
        {
          accessibleModules: [
            {
              url: jasmine.any(String),
              name: 'Admin',
              imageUrl: jasmine.any(String),
            },
          ],
          headerModulesVisible: true,
        }
      )
    })

    it('ignores modules which are not applicable', () => {
      expect(
        analyticsApp(
          {},
          {type: actions.SHOW_HEADER_MODULES, payload: ['fast_response', 'foobar']}
        )
      ).toEqual(
        {
          accessibleModules: [
            {
              url: jasmine.any(String),
              name: 'Fast Response',
              imageUrl: jasmine.any(String),
            },
          ],
          headerModulesVisible: true,
        }
      )
    })

    it('orders the items appropriately', () => {
      let unorderedModules = ['reevoo_admin', 'vetting', 'analytics', 'fast_response', 'help', 'admin']
      let orderedModules = analyticsApp(
        {},
        {
          type: actions.SHOW_HEADER_MODULES,
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

  describe('hiding the modules dropdown', () => {
    describe('when the modules dropdown is open', () => {
      it('closes the modules dropdown', () => {
        expect(
          analyticsApp(
            {headerModulesVisible: true},
            {type: actions.HIDE_HEADER_MODULES}
          )
        ).toEqual(
          {headerModulesVisible: false}
        )
      })
    })

    describe('when the modules dropdown is closed', () => {
      it('opens the modules dropdown', () => {
        expect(
          analyticsApp(
            {headerModulesVisible: false},
            {type: actions.HIDE_HEADER_MODULES}
          )
        ).toEqual(
          {headerModulesVisible: false}
        )
      })
    })
  })
})
