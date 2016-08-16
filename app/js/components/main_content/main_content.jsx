import React, {PropTypes} from 'react'
import './main_content.scss'

const MainContent = ({children}) => (
  <section className='main-content'>
    {children}
  </section>
)

MainContent.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]),
}

export default MainContent
