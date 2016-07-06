import { connect } from 'react-redux'
import { toggleDrawer } from '../actions/actions.js'
import CPAppBar from '../components/cp_app_bar.jsx'

const mapStateToProps = (state) => {
  // There are no props to map, but we need a function to call connect()!
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    leftIconClick: () => {
      dispatch(toggleDrawer())
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CPAppBar)
