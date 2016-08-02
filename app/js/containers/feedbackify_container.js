import { connect } from 'react-redux'
import Feedbackify from '../components/feedbackify/feedbackify'

const mapStateToProps = ({analyticsApp}) => ({ email: analyticsApp.profile ? analyticsApp.profile.email : null })

export default connect(
  mapStateToProps
)(Feedbackify)
