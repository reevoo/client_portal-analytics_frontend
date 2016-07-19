import React from 'react'
import FontIcon from 'material-ui/FontIcon'
import colours from '!!sass-variable-loader!client_portal-assets/dist/sass/colours.scss'

import './header_actions.scss'

const style = {
  fontSize: '25px',
}

const HeaderActions = () => (
  <div className='header-actions'>
    <a href='#'><FontIcon className='icon-faq' color='#fff' hoverColor={colours.reevooBlue} style={style} /></a>
    <a href='#'><FontIcon className='icon-user' color='#fff' hoverColor={colours.reevooBlue} style={style} /></a>
    <a href='#'><FontIcon className='icon-modules_icon' color='#fff' hoverColor={colours.reevooBlue} style={style} /></a>
    <a href='/admin/sign_out' className='header-actions__text'>Sign out</a>
  </div>
)

export default HeaderActions
