import { connect } from 'react-redux'
import ClientPortalModules from '../components/client_portal_modules/client_portal_modules'

const mapStateToProps = ({analyticsApp}) => ({
  modules: analyticsApp.accessibleModules,
})

export default connect(
  mapStateToProps
)(ClientPortalModules)
