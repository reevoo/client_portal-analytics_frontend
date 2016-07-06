import React from 'react'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import './cp_drawer.scss'

class CPDrawer extends React.Component {

  constructor (props) {
    super(props)
    this.state = {open: true}
  };

  handleToggle () {
    this.setState({open: !this.state.open})
  }

  render () {
    return (
      <Drawer open={this.state.open} className='drawer'>
        <MenuItem>Menu Item</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
      </Drawer>
    )
  }
}

export default CPDrawer
