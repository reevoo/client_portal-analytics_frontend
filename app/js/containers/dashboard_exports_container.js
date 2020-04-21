import { connect } from 'react-redux'
import DashboardExports from '../components/dashboard_exports/dashboard_exports'
import {
  exportImageDashboard,
  exportPDFDashboard,
  exportCrosstabDashboard,
} from '../actions/dashboards'

const mapStateToProps = ({ analyticsApp, ui, router }) => ({
  loading: ui.loadingDashboardValues,
})

const mapActionsToProps = {
  exportImage: exportImageDashboard,
  exportPDF: exportPDFDashboard,
  exportCrosstab: exportCrosstabDashboard,
}

export default connect(mapStateToProps, mapActionsToProps)(DashboardExports)
