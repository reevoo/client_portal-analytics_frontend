import React from 'react'
import AppBar from 'material-ui/AppBar'

function leftIconTouchTap () {
  console.log('Open the left bar here....')
}

const CPAppBar = () => (
  <AppBar
    title='HAIL US'
    onLeftIconButtonTouchTap={leftIconTouchTap}
    className='app-bar'
  />
)

export default CPAppBar
