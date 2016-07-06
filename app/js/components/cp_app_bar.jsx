import React, { PropTypes } from 'react'
import AppBar from 'material-ui/AppBar'

const CPAppBar = ({ leftIconClick }) => (
  <AppBar
    title='HAIL US'
    onLeftIconButtonTouchTap={leftIconClick}
    className='app-bar'
  />
)

CPAppBar.propTypes = {
  leftIconClick: PropTypes.func.isRequired,
}

export default CPAppBar
