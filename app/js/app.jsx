import React from 'react'
import { Router, Route, hashHistory } from 'react-router'
import { reduxReactRouter, ReduxRouter } from 'redux-router'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import TagManager from 'react-gtm-module'
import reducers from './reducers/reducers'

import createHashHistory from 'history/lib/createHashHistory'

import AppContainer from './containers/app_container'
import DashboardPanelContainer from './containers/dashboard_panel_container'
import { GTM_AUTH_KEY, GTM_ENV, GTM_ID } from './constants/app_constants'

// Compose reduxReactRouter with other store enhancers
const store = compose(
  applyMiddleware(thunk),
  reduxReactRouter({ createHistory: createHashHistory })
)(createStore)(reducers)

class App extends React.Component {
  componentDidMount () {
    const tagManagerArgs = {
      gtmId: GTM_ID,
      auth: GTM_AUTH_KEY,
      preview: GTM_ENV,
      events: {
        'gtm.start': new Date().getTime(),
      },
    }

    TagManager.initialize(tagManagerArgs)
  }

  render () {
    return (
      <Provider store={store}>
        <ReduxRouter>
          <Router history={hashHistory}>
            <Route path="/" component={AppContainer}>
              <Route path="dashboards/:id" component={DashboardPanelContainer} />
            </Route>
          </Router>
        </ReduxRouter>
      </Provider>
    )
  }
}

render(<App />, document.getElementById('app'))
