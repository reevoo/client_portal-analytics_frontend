import React, { PropTypes } from 'react'
import { TABLEAU_HOST } from '../../constants/app_constants'
import './dashboard_panel.scss'

const DashboardPanel = ({ leftHandNavVisible, dashboard, token, userId }) => {
  return dashboard && token
      ? <div className={`dashboard-panel ${leftHandNavVisible ? 'collapsed' : 'expanded'}`}>
        <iframe
          src={`${TABLEAU_HOST}trusted/${token}/views/${dashboard.views[0].replace('sheets/', '')}?:embed=yes&:toolbar=no&:showShareOptions=no&:record_performance=yes&UUID=${userId}`} />
      </div>
      : null
}

DashboardPanel.propTypes = {
  leftHandNavVisible: PropTypes.bool.isRequired,
  dashboard: PropTypes.object,
  token: PropTypes.string,
  userId: PropTypes.string,
}

export default DashboardPanel
