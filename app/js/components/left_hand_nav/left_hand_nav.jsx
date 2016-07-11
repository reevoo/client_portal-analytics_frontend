import React, { PropTypes } from 'react'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import './left_hand_nav.scss'

const LeftHandNav = ({ leftHandNavVisible }) => (
  <Drawer open={leftHandNavVisible} className='left-hand-nav'>
    <MenuItem>Menu Item</MenuItem>
    <MenuItem>Menu Item 2</MenuItem>
  </Drawer>
)

LeftHandNav.propTypes = {
  leftHandNavVisible: PropTypes.bool.isRequired,
}

export default LeftHandNav
