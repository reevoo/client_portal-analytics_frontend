import { connect } from 'react-redux'
import LeftHandNav from '../components/left_hand_nav/left_hand_nav.jsx'

const mapStateToProps = (state) => ({
  leftHandNavVisible: state.leftHandNavVisible,
})

export default connect(
  mapStateToProps
)(LeftHandNav)