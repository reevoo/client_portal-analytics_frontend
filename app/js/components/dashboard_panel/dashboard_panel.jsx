import React, { PropTypes } from 'react'
import { TABLEAU_HOST } from '../../constants/app_constants'
import './dashboard_panel.scss'

const DashboardPanel = ({leftHandNavVisible, selectedDashboard, token}) => (
  (token && selectedDashboard) ?
  <div className={`dashboard-panel ${leftHandNavVisible ? 'collapsed' : 'expanded'}`}>
    {`selectedDashboard=${selectedDashboard.name}`}
    <iframe
      src={`https://tableau.reevoo.com/trusted/${token}/views/${selectedDashboard.views[0].replace('sheets/', '')}?:embed=yes&:toolbar=no&:showShareOptions=no&:record_performance=yes`}/>
  </div>
    : null
)

DashboardPanel.propTypes = {
  leftHandNavVisible: PropTypes.bool.isRequired,
  selectedDashboard: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired
}

export default DashboardPanel
