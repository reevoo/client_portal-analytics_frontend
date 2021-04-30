import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import Divider from 'material-ui/Divider'
import Drawer from 'material-ui/Drawer'
import { List, ListItem, MakeSelectable } from 'material-ui/List'
import './left_hand_nav.scss'

import LeftHandNavHeader from '../left_hand_nav_header/left_hand_nav_header.jsx'
import colours from '!!sass-variable-loader!client_portal-assets/dist/sass/colours.scss' // Load Reevoo colour variables
import analyticsPath from 'client_portal-assets/dist/images/app_icons/large/analytics.png'

const listStyle = {
  paddingTop: 0,
}

const listItemStyle = {
  borderBottom: '1px solid rgba(0,0,0,.1)',
  fontSize: '14px',
  fontWeight: '600',
}

const selectedItemStyle = {
  color: colours.reevooOrange,
  textDecoration: 'none',
}

const SelectableList = MakeSelectable(List)

/* This is needed to avoid a nasty warning/error in the console.
 * Once we refactor the reducers we can simplify it accessing the dashboards by id directly.
 */
const onChange = () => {}

const LeftHandNav = ({ leftHandNavVisible, dashboards, selectedDashboardId }) => (
  <Drawer open={leftHandNavVisible} className='left-hand-nav'>
    <LeftHandNavHeader imgPath={analyticsPath} text='Analytics' />
    <Divider />
    <SelectableList
      onChange={onChange}
      selectedItemStyle={selectedItemStyle}
      style={listStyle}
      value={selectedDashboardId}
      >
      {dashboards.map((dashboard) => (
        <ListItem key={dashboard.id} value={dashboard.id} style={listItemStyle}>
          <Link to={`/dashboards/${dashboard.id}`} className='left-hand-nav-link'>{dashboard.name}</Link>
        </ListItem>
      ))}
    </SelectableList>
  </Drawer>
)

LeftHandNav.propTypes = {
  leftHandNavVisible: PropTypes.bool.isRequired,
  dashboards: PropTypes.array.isRequired,
  selectedDashboardId: PropTypes.string,
}

export default LeftHandNav
