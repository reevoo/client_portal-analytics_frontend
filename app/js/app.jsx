import injectTapEventPlugin from 'react-tap-event-plugin'
import React from 'react'
import {render} from 'react-dom'

import '../styles/styles.scss'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import CPAppBar from './components/cp_app_bar.jsx'
import CPDrawer from './components/cp_drawer/cp_drawer.jsx'

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

const App = () => (
  <MuiThemeProvider muiTheme={rvMuiTheme}>
    <div>
      <CPAppBar />
      <CPDrawer />
    </div>
  </MuiThemeProvider>
)

render(<App />, document.getElementById('app'))
