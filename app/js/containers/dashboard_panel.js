import { connect } from 'react-redux'
import DashboardPanel from '../components/dashboard_panel/dashboard_panel.jsx'

const mapStateToProps = (state) => ({
  leftHandNavVisible: state.leftHandNavVisible,
})

export default connect(
  mapStateToProps
)(DashboardPanel)
