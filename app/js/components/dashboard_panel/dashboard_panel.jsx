import React, { PropTypes } from 'react'
import { TABLEAU_HOST } from '../../constants/app_constants'
import './dashboard_panel.scss'

const DashboardPanel = ({leftHandNavVisible, dashboard, token}) => {
  return token && dashboard
      ? <div className={`dashboard-panel ${leftHandNavVisible ? 'collapsed' : 'expanded'}`}>
        <iframe
          src={`https://tableau.reevoo.com/trusted/${token}/views/${dashboard.views[0].replace('sheets/', '')}?:embed=yes&:toolbar=no&:showShareOptions=no&:record_performance=yes`} />
      </div>
      : null
}

DashboardPanel.propTypes = {
  leftHandNavVisible: PropTypes.bool.isRequired,
  dashboard: PropTypes.object,
  token: PropTypes.string,
}

export default DashboardPanel
