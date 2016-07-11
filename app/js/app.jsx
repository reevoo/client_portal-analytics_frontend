import injectTapEventPlugin from 'react-tap-event-plugin'
import React from 'react'
import { createStore } from 'redux'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import analyticsApp from './reducers/reducers.js'

import '../styles/styles.scss'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import Header from './containers/header.js'
import LeftHandNav from './containers/left_hand_nav.js'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

const rvMuiTheme = getMuiTheme({
  zIndex: {
    appBar: 1350, // Puts us over the left hand nav
  },
  appBar: {
    color: '#FFA000',
  },
})

let store = createStore(analyticsApp)

const App = () => (
  <MuiThemeProvider muiTheme={rvMuiTheme}>
    <div>
      <Header />
      <LeftHandNav />
    </div>
  </MuiThemeProvider>
)

render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('app')
)
