import { connect } from 'react-redux'
import AnalyticsAPI from '../services/analytics_api'
import DashboardPanel from '../components/dashboard_panel/dashboard_panel.jsx'
import { getDashboardToken } from '../actions/dashboards'
import React, { Component } from 'react'

class DashboardPanelContainer extends Component {
  componentWillMount () {
    this.props.getDashboardToken()
  }
  componentWillUpdate (nextProps) {
    if (nextProps.selectedDashboard != this.props.selectedDashboard){
      this.props.getDashboardToken()
    }
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
  token: state.token //AnalyticsAPI.getTableauToken()
})

export default connect(
  mapStateToProps,
  { getDashboardToken }
)(DashboardPanelContainer)
