import { connect } from 'react-redux'
import LeftHandNav from '../components/left_hand_nav/left_hand_nav.jsx'
import { loadDashboards, selectDashboard } from '../actions/dashboards'
import React, { Component } from 'react'


class LeftHandNavContainer extends Component {
  componentWillReceiveProps (nextProps) {
    if (nextProps.dashboardIds.length != this.props.dashboardIds.length) {
      this.props.loadDashboards(nextProps.dashboardIds)
    }
  }

  render () {
    const {
      dashboards,
      leftHandNavVisible,
      selectDashboard,
      selectedDashboard,
    } = this.props

    return (
      <LeftHandNav
        dashboards={dashboards}
        leftHandNavVisible={leftHandNavVisible}
        selectDashboard={selectDashboard}
        selectedDashboard={selectedDashboard}
      />
    )
  }
}

const getDashboardIds = (profile) => profile && profile.client_users_accessible_dashboards
  ? profile.client_users_accessible_dashboards
  : []

const mapStateToProps = (state) => ({
  leftHandNavVisible: state.leftHandNavVisible,
  dashboards: state.dashboards,
  dashboardIds: getDashboardIds(state.profile),
  selectedDashboard: state.selectedDashboard,
})

const actions = {
  loadDashboards,
  selectDashboard,
}

export default connect(
  mapStateToProps,
  actions
)(LeftHandNavContainer)
