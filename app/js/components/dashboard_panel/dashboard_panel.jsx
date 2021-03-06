import React, { PropTypes } from 'react'
import { Card, CardHeader } from 'material-ui/Card'
import DashboardExportsContainer from '../../containers/dashboard_exports_container'

import './dashboard_panel.scss'

const cardHeaderStyles = {
  backgroundColor: '#f9f9f9',
}

const cardHeaderTitleStyles = {
  fontSize: '24px',
}

const DashboardPanel = ({ leftHandNavVisible, title, exportEnabled }) => {
  return (
    <div className={`dashboard-panel ${leftHandNavVisible ? 'collapsed' : 'expanded'}`}>
      {title && <Card style={cardHeaderStyles} className='dashboard-panel__header'>
        <CardHeader title={title} titleStyle={cardHeaderTitleStyles} />
      </Card>}
      {exportEnabled && <DashboardExportsContainer />}
      <div id="dashboard-container" />
    </div>
  )
}

DashboardPanel.propTypes = {
  title: PropTypes.string,
  leftHandNavVisible: PropTypes.bool.isRequired,
  exportEnabled: PropTypes.bool,
}

export default DashboardPanel
