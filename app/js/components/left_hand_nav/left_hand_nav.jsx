import React, { Component, PropTypes } from 'react'
import Divider from 'material-ui/Divider'
import Drawer from 'material-ui/Drawer'
import { List, ListItem, MakeSelectable } from 'material-ui/List'
import './left_hand_nav.scss'

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

  clickHandler (dashboard) {
    return (event) => {
      this.props.selectDashboard(dashboard)
    }
  }

  changeSelectedItem (event, index) {
    this.setState({ selectedItemIndex: index })
  }

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
		  {
            dashboards.map((dashboard, index) => {
              return(<ListItem key={index} value={index} onClick={selectDashboard.bind(this, dashboard)} style={listItemStyle}>{dashboard}</ListItem>)
            })
          }
        </SelectableList>
      </Drawer>
    )
  }
}

LeftHandNav.propTypes = {
  leftHandNavVisible: PropTypes.bool.isRequired,
  dashboards: PropTypes.array.isRequired,
  selectDashboard: PropTypes.func.isRequired,
}

export default LeftHandNav
