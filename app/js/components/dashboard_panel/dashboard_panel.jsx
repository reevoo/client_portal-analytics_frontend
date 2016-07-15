import React, { PropTypes } from 'react'
import './dashboard_panel.scss'

const DashboardPanel = ({leftHandNavVisible, selectedDashboard}) => (
  <div className={`dashboard-panel ${leftHandNavVisible ? 'collapsed' : 'expanded'}`}>
    {selectedDashboard}
  </div>
)

DashboardPanel.propTypes = {
  leftHandNavVisible: PropTypes.bool.isRequired,
  selectedDashboard: React.PropTypes.string
}

export default DashboardPanel
