import { connect } from 'react-redux'
import DashboardPanel from '../components/dashboard_panel/dashboard_panel.jsx'
import { getSelectedDashboardById, loadTableauDashboard } from '../actions/dashboards'
import React, { Component, PropTypes } from 'react'

class DashboardPanelContainer extends Component {
  componentWillMount () {
    this.props.loadTableauDashboard()
  }

  componentWillUpdate (nextProps) {
    if (nextProps.selectedDashboard !== this.props.selectedDashboard) {
      this.props.loadTableauDashboard()
    }
  }

  render () {
    const { leftHandNavVisible, selectedDashboard } = this.props
    const title = selectedDashboard ? selectedDashboard.name : 'Loading dashboard...'

    return <DashboardPanel title={title} leftHandNavVisible={leftHandNavVisible} />
  }
}

DashboardPanelContainer.propTypes = {
  leftHandNavVisible: PropTypes.bool.isRequired,
  selectedDashboard: PropTypes.object,
  // Actions
  loadTableauDashboard: PropTypes.func.isRequired,
}

const mapStateToProps = ({ analyticsApp, router }) => ({
  leftHandNavVisible: analyticsApp.leftHandNavVisible,
  selectedDashboard: getSelectedDashboardById(analyticsApp.dashboards, router.params.id),
})

export default connect(
  mapStateToProps,
  { loadTableauDashboard }
)(DashboardPanelContainer)
