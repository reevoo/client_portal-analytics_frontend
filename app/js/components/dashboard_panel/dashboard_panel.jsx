import React, { PropTypes } from 'react'
import { TABLEAU_HOST } from '../../constants/app_constants'
import './dashboard_panel.scss'

const DashboardPanel = ({leftHandNavVisible, selectedDashboard, token}) => (
  token ?
  <div className={`dashboard-panel ${leftHandNavVisible ? 'collapsed' : 'expanded'}`}>
    {`leftHandNavVisible = ${leftHandNavVisible}`}
    <br/>
    {`selectedDashboard = ${selectedDashboard}`}
    <br/>
    {`token = ${token}`}
  </div>
    : null
)

DashboardPanel.propTypes = {
  leftHandNavVisible: PropTypes.bool.isRequired,
  selectedDashboard: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired
}

export default DashboardPanel
