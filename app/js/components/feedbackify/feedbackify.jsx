import React, { PropTypes } from 'react'
import './feedbackify.scss'

const onClick = () => { fby.push(['showForm', '8947']) }

const Feedbackify = () => (
  <div className="feedbackify" onClick={onClick}>feedback</div>
)

export default Feedbackify
