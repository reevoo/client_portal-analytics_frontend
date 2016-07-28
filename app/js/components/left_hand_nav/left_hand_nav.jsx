import React, { Component, PropTypes } from 'react'
import Divider from 'material-ui/Divider'
import Drawer from 'material-ui/Drawer'
import { List, ListItem, MakeSelectable } from 'material-ui/List'
import './left_hand_nav.scss'

import LeftHandNavHeader from '../left_hand_nav_header/left_hand_nav_header.jsx'
import colours from '!!sass-variable-loader!client_portal-assets/dist/sass/colours.scss' // Load Reevoo colour variables
import analyticsPath from 'client_portal-assets/dist/images/app_icons/large/analytics.png'

const SelectableList = MakeSelectable(List)

const listStyle = {
  paddingTop: 0,
}

const listItemStyle = {
  borderBottom: '1px solid rgba(0,0,0,.1)',
  fontSize: '14px',
  fontWeight: '600',
  padding: '23px 33px',
}

const selectedItemStyle = {
  color: colours.reevooOrange,
}

class LeftHandNav extends Component {
  constructor () {
    super()

    this.changeSelectedItem = this.changeSelectedItem.bind(this)

    // We need internal state until we have this connected with a Router
    this.state = {
      selectedItemIndex: 1,
    }
  }

  changeSelectedItem (event, index) {
    this.setState({ selectedItemIndex: index })
  }

  render () {
    const { leftHandNavVisible } = this.props
    return (
      <Drawer open={leftHandNavVisible} className='left-hand-nav'>
        <LeftHandNavHeader imgPath={analyticsPath} text='Analytics' />
        <Divider />
        <SelectableList
          onChange={this.changeSelectedItem}
          selectedItemStyle={selectedItemStyle}
          style={listStyle}
          value={this.state.selectedItemIndex}
          >
          <ListItem value={1} style={listItemStyle}>Menu Item</ListItem>
          <ListItem value={2} style={listItemStyle}>Menu Item 2</ListItem>
        </SelectableList>
      </Drawer>
    )
  }
}

LeftHandNav.propTypes = {
  leftHandNavVisible: PropTypes.bool.isRequired,
}

export default LeftHandNav
