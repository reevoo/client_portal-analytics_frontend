import React from 'react';
import AppBar from 'material-ui/AppBar';

function leftIconTouchTap () {
  console.log("Open the left bar here....");
}

const style = {
  zIndex: 2001,
  backgroundColor: '#FFA000'
};

const CPAppBar = () => (
  <AppBar
    title="HAIL US"
    onLeftIconButtonTouchTap={leftIconTouchTap}
    className="app-bar"
    style={style}
  />
)

export default CPAppBar;