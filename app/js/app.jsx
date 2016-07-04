import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import {render} from 'react-dom';

import "../styles/styles.scss";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CPAppBar from './components/cp_app_bar.jsx';
import CPDrawer from './components/cp_drawer.jsx';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const App = () => (
  <MuiThemeProvider>
    <div>
      <CPAppBar />
      <CPDrawer />
    </div>
  </MuiThemeProvider>
);

render(<App/>, document.getElementById('app'));