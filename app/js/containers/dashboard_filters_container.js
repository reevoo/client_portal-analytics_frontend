import { connect } from 'react-redux'
import DashboardFilters from '../components/dashboard_filters/dashboard_filters'
import {
  changeFilter,
  saveDashboardView,
  setDefaultDashboardView,
  showDashboardView,
  removeDashboardView,
  exportImageDashboard,
  exportPDFDashboard,
} from '../actions/dashboards'

const mapStateToProps = ({ analyticsApp, ui, router }) => ({
  filters: analyticsApp.workbook ? analyticsApp.workbook.filters : [],
  views: analyticsApp.workbook ? analyticsApp.workbook.views : [],
  defaultView: analyticsApp.workbook && analyticsApp.workbook.defaultView,
  selectedView: analyticsApp.workbook && analyticsApp.workbook.selectedView,
  loading: ui.loadingDashboardValues,
})

const mapActionsToProps = {
  changeFilter,
  removeView: removeDashboardView,
  saveView: saveDashboardView,
  setDefaultView: setDefaultDashboardView,
  showView: showDashboardView,
  exportImage: exportImageDashboard,
  exportPDF: exportPDFDashboard,
}

export default connect(mapStateToProps, mapActionsToProps)(DashboardFilters)
