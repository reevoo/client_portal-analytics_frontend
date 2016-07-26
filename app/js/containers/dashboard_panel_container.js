import { connect } from 'react-redux'
import DashboardPanel from '../components/dashboard_panel/dashboard_panel.jsx'
import { getDashboardToken } from '../actions/dashboards'
import React, { Component } from 'react'

class DashboardPanelContainer extends Component {
  componentWillMount () {
    this.props.getDashboardToken()
  }
  shouldComponentUpdate(nextProps) {
    // if a new dashboard has been selected we need to get a new token in order to display it
    // we block the update of the element and we request a token with getDashboardToken()
    // after the value of the token has updated then the component will re-render
    if (nextProps.selectedDashboard != this.props.selectedDashboard){
      this.props.getDashboardToken()
      return false
    }
    return true
  }

  render () {
    const {
      leftHandNavVisible,
      selectedDashboard,
      token,
    } = this.props

    return (
      <DashboardPanel
        leftHandNavVisible={leftHandNavVisible}
        selectedDashboard={selectedDashboard}
        token={token}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  leftHandNavVisible: state.leftHandNavVisible,
  selectedDashboard: state.selectedDashboard,
  token: state.token
})

export default connect(
  mapStateToProps,
  { getDashboardToken }
)(DashboardPanelContainer)
