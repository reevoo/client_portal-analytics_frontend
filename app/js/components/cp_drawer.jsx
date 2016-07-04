import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

class CPDrawer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: true};
  };

  handleToggle() {
    this.setState({open: !this.state.open});
  }

  render() {
    const style = {
      paddingTop: "64px"
    } 
    return (
      <Drawer open={this.state.open} containerStyle={style}>
        <MenuItem>Menu Item</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
      </Drawer>
    );
  }
}

export default CPDrawer;