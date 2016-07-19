import injectTapEventPlugin from 'react-tap-event-plugin'
import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import analyticsApp from './reducers/reducers'
import { fetchProfile } from './actions/profile'

import '../styles/styles.scss' // Load global overrides (as few as possible please)
import colours from '!!sass-variable-loader!client_portal-assets/dist/sass/colours.scss' // Load Reevoo colour variables

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import Header from './containers/header'
import LeftHandNav from './containers/left_hand_nav'
import DashboardPanelContainer from './containers/dashboard_panel_container'

import Auth from './services/auth'


// Initialize authorization
Auth.init()

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

const rvMuiTheme = getMuiTheme({
  appBar: {
    color: colours.reevooOrange,
  },
  fontFamily: 'Open Sans, sans-serif',
  zIndex: {
    appBar: 1350, // Puts us over the left hand nav
  },
})

let store = createStore(analyticsApp, applyMiddleware(thunk))

store.dispatch(fetchProfile())

const App = () => (
  <MuiThemeProvider muiTheme={rvMuiTheme}>
    <div>
      <Header />
      <LeftHandNav />
      <DashboardPanelContainer />
    </div>
  </MuiThemeProvider>
)

render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('app')
)
