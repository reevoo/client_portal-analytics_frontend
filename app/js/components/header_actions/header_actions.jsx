import React, { PropTypes } from 'react'
import FontIcon from 'material-ui/FontIcon'
import { Card, CardHeader } from 'material-ui/Card'
import Popover from 'material-ui/Popover'
import { LOGOUT_URL, PROFILE_URL, HELP_URL } from '../../constants/app_constants'
import ClientPortalModules from '../../containers/client_portal_modules_container'

import colours from '!!sass-variable-loader!client_portal-assets/dist/sass/colours.scss'

import './header_actions.scss'

const iconStyle = {
  fontSize: '25px',
}

const HeaderActions = ({showHeaderModules, hideHeaderModules, headerModulesVisible}) => (
  <div className='header-actions'>
    <a href={HELP_URL}><FontIcon className='icon-faq' color='#fff' hoverColor={colours.reevooBlue} style={iconStyle} /></a>
    <a href={PROFILE_URL}><FontIcon className='icon-user' color='#fff' hoverColor={colours.reevooBlue} style={iconStyle} /></a>
    <a href='#' onTouchTap={showHeaderModules}>
      <FontIcon className='icon-modules_icon' color='#fff' hoverColor={colours.reevooBlue} style={iconStyle} />
    </a>
    <a href={LOGOUT_URL} className='header-actions__text' id='sign-out'>Sign out</a>
    <Popover
      open={headerModulesVisible}
      anchorEl={document.getElementById('sign-out')}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
      onRequestClose={hideHeaderModules}
    >
      <Card style={{ backgroundColor: colours.cardBackgroundColor, color: colours.mediumTextColor }}>
        <CardHeader
          title={<div className='modules-header'>
            <FontIcon className='icon-modules_icon modules-header__icon' color={colours.mediumTextColor} hoverColor={colours.reevooBlue} style={iconStyle} />
            <span>Modules</span>
          </div>}
          titleStyle={{fontSize: '20px', color: colours.mediumTextColor}}
          style={{borderBottom: '1px solid #efefef', paddingBottom: '22px', paddingTop: '22px'}}
          />
        <ClientPortalModules />
      </Card>
    </Popover>
  </div>
)

HeaderActions.propTypes = {
  showHeaderModules: PropTypes.func.isRequired,
  hideHeaderModules: PropTypes.func.isRequired,
  headerModulesVisible: PropTypes.bool.isRequired,
}

export default HeaderActions
