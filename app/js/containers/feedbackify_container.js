import { connect } from 'react-redux'
import Feedbackify from '../components/feedbackify/feedbackify.jsx'

const mapStateToProps = (state) => {
  // There are no props to map, but we need a function to call connect()!
  return {}
}

export default connect(
  mapStateToProps
)(Feedbackify)
