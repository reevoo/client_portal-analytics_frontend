import React, { PropTypes } from 'react'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import './cp_drawer.scss'

const CPDrawer = ({ drawerVisible }) => (
  <Drawer open={drawerVisible} className='drawer'>
    <MenuItem>Menu Item</MenuItem>
    <MenuItem>Menu Item 2</MenuItem>
  </Drawer>
)

CPDrawer.propTypes = {
  drawerVisible: PropTypes.bool.isRequired,
}

export default CPDrawer
