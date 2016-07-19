import injectTapEventPlugin from 'react-tap-event-plugin'
import React from 'react'
import { createStore } from 'redux'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import analyticsApp from './reducers/reducers.js'

import '../styles/styles.scss' // Load global overrides (as few as possible please)
import colours from '!!sass-variable-loader!client_portal-assets/dist/sass/colours.scss' // Load Reevoo colour variables

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import Header from './containers/header.js'
import LeftHandNav from './containers/left_hand_nav.js'
import DashboardPanel from './containers/dashboard_panel.js'

import Auth from './services/auth.js'

// Initialize authorization
Auth.init()

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

const rvMuiTheme = getMuiTheme({
  zIndex: {
    appBar: 1350, // Puts us over the left hand nav
  },
  appBar: {
    color: colours.reevooOrange,
  },
})

let store = createStore(analyticsApp)

const App = () => (
  <MuiThemeProvider muiTheme={rvMuiTheme}>
    <div>
      <Header />
      <LeftHandNav />
      <DashboardPanel />
    </div>
  </MuiThemeProvider>
)

render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('app')
)
