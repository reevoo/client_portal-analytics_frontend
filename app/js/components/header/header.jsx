import React, { PropTypes } from 'react'
import AppBar from 'material-ui/AppBar'
import HeaderActions from '../../containers/header_actions_container'
import IconButton from 'material-ui/IconButton'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'

import './header.scss'
import 'client_portal-assets/dist/sass/_reevooclientportaldings.scss' // Load icons

// The material-ui AppBar component claims to have some properties for customising it.
// However, they are a bit shit and we have to do a bit of tomfoolery here to make
// the hover effects we want work. The problem we hit was:
//
//   1. If we set a class with hover state using iconClassNameLeft, the contents disappear
//      because this is intended only for icon classes like 'icon-menu'
//   2. If we just set the 'header__burger' class on the IconButton whilst using iconElementLeft,
//      it ignores any hover state due to "background: 'none'" which is set on the NavigationMenu
//
// Consequently, we have to explicitly override and clear the background/width/height for the
// NavigationMenu element, and override the default margins which get set on the parent div of
// the IconButton element (using the iconStyleLeft property)
//
// So yeah, here be dragons.
const iconElementClearDefaults = {
  background: 'auto',
  width: 'inherit',
  height: 'inherit',
}

const iconLeftContainerStyles = {
  marginTop: '0px',
  marginRight: '0px',
  marginBottom: '0px',
  marginLeft: '0px',
  padding: '0px',
  height: '64px',
  width: '82px',
}

const headerStyles = {
  paddingLeft: '0px',
  position: 'fixed',
}

const Header = ({ leftIconClick }) => (
  <AppBar
    className='header'
    iconElementRight={<HeaderActions />}
    iconElementLeft={
      <IconButton className='header__burger' style={iconElementClearDefaults} onClick={leftIconClick}>
        <NavigationMenu />
      </IconButton>
    }
    iconStyleLeft={iconLeftContainerStyles}
    style={headerStyles}
    title={<a className='header__logo' href='/'><span className='icon-reevoo_logo'></span></a>}
  />
)

Header.propTypes = {
  leftIconClick: PropTypes.func.isRequired,
}

export default Header
