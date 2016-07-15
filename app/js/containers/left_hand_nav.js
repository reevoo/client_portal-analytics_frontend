import { connect } from 'react-redux'
import { selectDashboard } from '../actions/dashboards.js'
import LeftHandNav from '../components/left_hand_nav/left_hand_nav.jsx'

const mapStateToProps = (state) => ({
  leftHandNavVisible: state.leftHandNavVisible,
  dashboards: state.dashboards
})

const mapDispatchToProps = (dispatch) => {
  return {
    selectDashboard: (dashboard) => {
      dispatch(selectDashboard(dashboard))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftHandNav)
