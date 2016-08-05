import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Feedbackify from '../components/feedbackify/feedbackify'

const FeedbackifyContainer = ({ email }) => email ? <Feedbackify email={email} /> : null

FeedbackifyContainer.propTypes = {
  email: PropTypes.string,
}

const mapStateToProps = ({analyticsApp}) => ({
  email: analyticsApp.profile ? analyticsApp.profile.email : null,
})

export default connect(
  mapStateToProps
)(FeedbackifyContainer)
