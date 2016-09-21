import { connect } from 'react-redux'
import DashboardFilters from '../components/dashboard_filters/dashboard_filters'
import { changeFilter, getSelectedDashboardById } from '../actions/dashboards'
import React, { PropTypes } from 'react'

const DashboardFiltersContainer = ({ dashboardFilters, changeFilter }) =>
  <DashboardFilters filters={dashboardFilters} changeFilter={changeFilter} />

DashboardFiltersContainer.propTypes = {
  dashboardFilters: PropTypes.array.isRequired,
  // Actions
  changeFilter: PropTypes.func.isRequired,
}

const mapStateToProps = ({ analyticsApp, router }) => {
  const selectedDashboard = getSelectedDashboardById(analyticsApp.dashboards, router.params.id)
  return {
    selectedDashboard,
    dashboardFilters: analyticsApp.workbook ? analyticsApp.workbook.filters : [],
  }
}

export default connect(
  mapStateToProps,
  { changeFilter }
)(DashboardFiltersContainer)
