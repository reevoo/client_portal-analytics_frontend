import React, { PropTypes } from 'react'
import { Card, CardHeader } from 'material-ui/Card'
import DashboardFiltersContainer from '../../containers/dashboard_filters_container'

import './dashboard_panel.scss'

const cardHeaderStyles = {
  backgroundColor: '#f9f9f9',
}

const cardHeaderTitleStyles = {
  fontSize: '24px',
}

const DashboardPanel = ({ leftHandNavVisible, title }) => {
  return (
    <div className={`dashboard-panel ${leftHandNavVisible ? 'collapsed' : 'expanded'}`}>
      <Card style={cardHeaderStyles} className='dashboard-panel__header'>
        <CardHeader title={title} titleStyle={cardHeaderTitleStyles} />
      </Card>
      <DashboardFiltersContainer />
      <div id="dashboard-container" />
    </div>
  )
}

DashboardPanel.propTypes = {
  title: PropTypes.string.isRequired,
  leftHandNavVisible: PropTypes.bool.isRequired,
}

export default DashboardPanel
