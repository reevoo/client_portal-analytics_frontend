import React, { PropTypes } from 'react'
import './left_hand_nav_header.scss'

const LeftHandNavHeader = ({ imgPath, text }) => (
  <header className='left-hand-nav-header'>
    <img src={imgPath} className='left-hand-nav-header__image' />
    <h3 className='left-hand-nav-header__text'>{text}</h3>
  </header>
)

LeftHandNavHeader.propTypes = {
  imgPath: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default LeftHandNavHeader
