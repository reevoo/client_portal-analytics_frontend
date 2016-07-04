import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import {render} from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CPAppBar from './components/cp_app_bar.jsx';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const App = () => (
  <MuiThemeProvider>
    <CPAppBar />
  </MuiThemeProvider>
);

render(<App/>, document.getElementById('app'));