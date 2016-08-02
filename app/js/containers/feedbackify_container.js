import { connect } from 'react-redux'
import Feedbackify from '../components/feedbackify/feedbackify'
import { openFeedbackDialog } from '../actions/feedbackify'

const mapStateToProps = (state) => {
  // There are no props to map, but we need a function to call connect()!
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    feedbackButtonClick: () => {
      dispatch(openFeedbackDialog())
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Feedbackify)
