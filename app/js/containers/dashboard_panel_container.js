import { connect } from 'react-redux'
import DashboardPanel from '../components/dashboard_panel/dashboard_panel.jsx'
import { getDashboardToken, initTableauDashboard } from '../actions/dashboards'
import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'

class DashboardPanelContainer extends Component {
  componentWillMount () {
    this.props.getDashboardToken()
  }

  shouldComponentUpdate (nextProps) {
    // if a new dashboard has been selected we need to get a new token in order to display it
    // we block the update of the element and we request a token with getDashboardToken()
    // after the value of the token has updated then the component will re-render
    if (nextProps.selectedDashboard !== this.props.selectedDashboard) {
      this.props.getDashboardToken()
      return false
    }

    return true
  }

  componentDidUpdate () {
    const dashboardNode = findDOMNode(this)
    const { initTableauDashboard, token, selectedDashboard, userId } = this.props

    if (dashboardNode) {
      initTableauDashboard(dashboardNode, token, selectedDashboard.views[0].replace('sheets/', ''), userId)
    }
  }

  render () {
    return <DashboardPanel leftHandNavVisible={this.props.leftHandNavVisible} />
  }
}

DashboardPanelContainer.propTypes = {
  leftHandNavVisible: PropTypes.bool.isRequired,
  selectedDashboard: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  userId: PropTypes.string,
  // Actions
  getDashboardToken: PropTypes.func.isRequired,
  initTableauDashboard: PropTypes.func.isRequired,
}

const getSelectedDashboardById = (dashboards, id) =>
  dashboards.filter((dashboard) => dashboard.id === id)[0]

const mapStateToProps = ({ analyticsApp, router }) => ({
  leftHandNavVisible: analyticsApp.leftHandNavVisible,
  selectedDashboard: getSelectedDashboardById(analyticsApp.dashboards, router.params.id),
  token: analyticsApp.token,
  userId: analyticsApp.profile ? analyticsApp.profile.id : null,
})

export default connect(
  mapStateToProps,
  { getDashboardToken, initTableauDashboard }
)(DashboardPanelContainer)
