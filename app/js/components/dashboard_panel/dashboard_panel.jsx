import React, { PropTypes } from 'react'
import './dashboard_panel.scss'

const DashboardPanel = ({ leftHandNavVisible }) =>
  <div className={`dashboard-panel ${leftHandNavVisible ? 'collapsed' : 'expanded'}`} />

DashboardPanel.propTypes = {
  leftHandNavVisible: PropTypes.bool.isRequired,
}

export default DashboardPanel
