import { connect } from 'react-redux'
import Feedbackify from '../components/feedbackify/feedbackify'

const mapStateToProps = ({analyticsApp}) => {
  if (analyticsApp.profile) {
    fby.push(['setEmail', analyticsApp.profile.email]);
  }
  return {}
}

export default connect(
  mapStateToProps
)(Feedbackify)
