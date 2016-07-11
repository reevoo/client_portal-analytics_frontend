import React, { PropTypes } from 'react'
import AppBar from 'material-ui/AppBar'

const Header = ({ leftIconClick }) => (
  <AppBar
    title='HAIL US'
    onLeftIconButtonTouchTap={leftIconClick}
  />
)

Header.propTypes = {
  leftIconClick: PropTypes.func.isRequired,
}

export default Header
