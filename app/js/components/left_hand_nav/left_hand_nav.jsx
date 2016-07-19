import React, { PropTypes } from 'react'
import Divider from 'material-ui/Divider'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import './left_hand_nav.scss'

import LeftHandNavHeader from '../left_hand_nav_header/left_hand_nav_header.jsx'
import analyticsPath from 'client_portal-assets/dist/images/app_icons/large/analytics.png'

const LeftHandNav = ({ leftHandNavVisible }) => (
  <Drawer open={leftHandNavVisible} className='left-hand-nav'>
    <LeftHandNavHeader imgPath={analyticsPath} text='Analytics' />
    <Divider />
    <MenuItem>Menu Item</MenuItem>
    <MenuItem>Menu Item 2</MenuItem>
  </Drawer>
)

LeftHandNav.propTypes = {
  leftHandNavVisible: PropTypes.bool.isRequired,
}

export default LeftHandNav
