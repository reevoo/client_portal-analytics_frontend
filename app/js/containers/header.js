import { connect } from 'react-redux'
import { toggleLeftHandNav } from '../actions/actions.js'
import Header from '../components/header/header.jsx'
const mapStateToProps = (state) => {
  // There are no props to map, but we need a function to call connect()!
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    leftIconClick: () => {
      dispatch(toggleLeftHandNav())
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
