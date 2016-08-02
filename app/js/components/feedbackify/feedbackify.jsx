import React, { PropTypes } from 'react'
import './feedbackify.scss'

const Feedbackify = ({feedbackButtonClick}) => (
  <div className="feedbackify" onClick={feedbackButtonClick}>feedback</div>
)

Feedbackify.propTypes = {
  feedbackButtonClick: PropTypes.func.isRequired,
}

export default Feedbackify
