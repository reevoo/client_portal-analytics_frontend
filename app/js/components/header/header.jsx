import React, { PropTypes } from 'react'
import AppBar from 'material-ui/AppBar'

import './header.scss'
import 'client_portal-assets/dist/sass/_reevooclientportaldings.scss' // Load icons

const Header = ({ leftIconClick }) => (
  <AppBar
    className='header'
    onLeftIconButtonTouchTap={leftIconClick}
    title={<a className='header__logo' href='/'><span className='icon-reevoo_logo'></span></a>}
  />
)

Header.propTypes = {
  leftIconClick: PropTypes.func.isRequired,
}

export default Header
