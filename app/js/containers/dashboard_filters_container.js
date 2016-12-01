import { connect } from 'react-redux'
import DashboardFilters from '../components/dashboard_filters/dashboard_filters'
import {
  changeFilter,
  getSelectedDashboardById,
  saveDashboardView,
  setDefaultDashboardView,
  showDashboardView,
  removeDashboardView,
  exportImageDashboard,
  exportPDFDashboard,
} from '../actions/dashboards'
import React, { PropTypes } from 'react'

const DashboardFiltersContainer = ({
  dashboardFilters,
  dashboardViews,
  defaultDashboardView,
  selectedDashboardView,
  loading,
  changeFilter,
  removeDashboardView,
  saveDashboardView,
  setDefaultDashboardView,
  showDashboardView,
  exportImageDashboard,
  exportPDFDashboard,
}) =>
  <DashboardFilters
    filters={dashboardFilters}
    views={dashboardViews}
    defaultView={defaultDashboardView}
    selectedView={selectedDashboardView}
    loading={loading}
    changeFilter={changeFilter}
    removeView={removeDashboardView}
    saveView={saveDashboardView}
    setDefaultView={setDefaultDashboardView}
    showView={showDashboardView}
    exportImage={exportImageDashboard}
    exportPDF={exportPDFDashboard}
    />

DashboardFiltersContainer.propTypes = {
  dashboardFilters: PropTypes.array.isRequired,
  dashboardViews: PropTypes.array.isRequired,
  defaultDashboardView: PropTypes.string,
  selectedDashboardView: PropTypes.string,
  loading: PropTypes.bool,
  // Actions
  changeFilter: PropTypes.func.isRequired,
  removeDashboardView: PropTypes.func.isRequired,
  saveDashboardView: PropTypes.func.isRequired,
  setDefaultDashboardView: PropTypes.func.isRequired,
  showDashboardView: PropTypes.func.isRequired,
  exportImageDashboard: PropTypes.func.isRequired,
  exportPDFDashboard: PropTypes.func.isRequired,
}

const mapStateToProps = ({ analyticsApp, ui, router }) => ({
  selectedDashboard: getSelectedDashboardById(analyticsApp.dashboards, router.params.id),
  dashboardFilters: analyticsApp.workbook ? analyticsApp.workbook.filters : [],
  dashboardViews: analyticsApp.workbook ? analyticsApp.workbook.views : [],
  defaultDashboardView: analyticsApp.workbook && analyticsApp.workbook.defaultView,
  selectedDashboardView: analyticsApp.workbook && analyticsApp.workbook.selectedView,
  loading: ui.loadingDashboardValues,
})

export default connect(
  mapStateToProps,
  { changeFilter, removeDashboardView, saveDashboardView, setDefaultDashboardView, showDashboardView, exportImageDashboard, exportPDFDashboard }
)(DashboardFiltersContainer)
