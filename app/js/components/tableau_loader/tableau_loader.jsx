import React from 'react'

import './tableau_loader.scss'
import svgLoaderPath from './loader.svg'

const TableauLoader = () => (
  <div className='spinner'>
    <div className='spinner__svg'>
      <img src={svgLoaderPath} />
    </div>
  </div>
)

export default TableauLoader
