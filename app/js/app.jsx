import injectTapEventPlugin from 'react-tap-event-plugin'
import React from 'react'
import { Router, Route, hashHistory } from 'react-router'
import { reduxReactRouter, ReduxRouter } from 'redux-router';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import reducers from './reducers/reducers'
import { fetchProfile } from './actions/profile'
import createHashHistory from 'history/lib/createHashHistory'

import '../styles/styles.scss' // Load global overrides (as few as possible please)
import colours from '!!sass-variable-loader!client_portal-assets/dist/sass/colours.scss' // Load Reevoo colour variables

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import Header from './containers/header'
import LeftHandNavContainer from './containers/left_hand_nav_container'
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

// Compose reduxReactRouter with other store enhancers
const store = compose(
  applyMiddleware(thunk),
  reduxReactRouter({ createHistory: createHashHistory })
)(createStore)(reducers)

store.dispatch(fetchProfile())

const App = (props) => (
  <MuiThemeProvider muiTheme={rvMuiTheme}>
    <div>
      <Header />
      <LeftHandNavContainer selectedItem={props.params.id} />
      {props.children}
    </div>
  </MuiThemeProvider>
)

render(
  <Provider store={store}>
    <ReduxRouter>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <Route path="dashboards/:id" component={DashboardPanelContainer} />
        </Route>
      </Router>
    </ReduxRouter>
  </Provider>, document.getElementById('app')
)
