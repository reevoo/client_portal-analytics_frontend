import React, { PropTypes } from 'react'
import './feedbackify.scss'

const setFeedbackifyValues = (email) => () => {
  fby.push(['setEmail', email])
  fby.push(['showForm', '8947'])
}

const Feedbackify = ({email}) => (
  <div className="feedbackify" onClick={setFeedbackifyValues(email)}>feedback</div>
)

export default Feedbackify
