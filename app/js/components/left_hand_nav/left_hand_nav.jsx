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

    this.clickHandler = this.clickHandler.bind(this)
  }

  clickHandler (dashboard) {
    return () => this.props.selectDashboard(dashboard)
  }

  render () {
    const { leftHandNavVisible, dashboards, selectedDashboard } = this.props

    return (
      <Drawer open={leftHandNavVisible} className='left-hand-nav'>
        <LeftHandNavHeader imgPath={analyticsPath} text='Analytics' />
        <Divider />
        <SelectableList
          onChange={
            /* This is needed to avoid a nasty warning/error in the console.
             * Once we refactor the reducers we can simplify it accessing the dashboards by id directly.
             * */
            () => {}
          }
          selectedItemStyle={selectedItemStyle}
          style={listStyle}
          value={selectedDashboard ? selectedDashboard.id : null}
          >
          {dashboards.map((dashboard) => (
            <ListItem
              key={dashboard.id}
              value={dashboard.id}
              onClick={this.clickHandler(dashboard)}
              style={listItemStyle}
            >
              {dashboard.name}
            </ListItem>
          ))}
        </SelectableList>
      </Drawer>
    )
  }
}

LeftHandNav.propTypes = {
  leftHandNavVisible: PropTypes.bool.isRequired,
  dashboards: PropTypes.array.isRequired,
  selectDashboard: PropTypes.func.isRequired,
  selectedDashboard: PropTypes.object,
}

export default LeftHandNav
