import { connect } from 'react-redux'
import { showHeaderModules, hideHeaderModules } from '../actions/actions.js'
import HeaderActions from '../components/header_actions/header_actions'

const mapStateToProps = ({headerModulesVisible}) => ({
  headerModulesVisible: headerModulesVisible,
})

const mapDispatchToProps = (dispatch) => {
  return {
    showHeaderModules: () => dispatch(showHeaderModules()),
    hideHeaderModules: () => dispatch(hideHeaderModules()),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderActions)
