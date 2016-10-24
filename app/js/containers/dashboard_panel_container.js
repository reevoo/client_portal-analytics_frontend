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
    let title = selectedDashboard ? selectedDashboard.name : 'Loading dashboard...'
    // TODO: This is a temporary solution to hide the dashboard title
    // until we have all the dashboards with the proper setup on Tableau
    if (title !== 'Customer_Experience_JavaScipt') { title = null }
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
