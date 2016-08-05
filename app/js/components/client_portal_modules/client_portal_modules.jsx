import React, { PropTypes } from 'react'

import './client_portal_modules.scss'

const ClientPortalModules = ({modules}) => (
  <div className='client-portal-modules'>
    {modules.map(({url, name, imageUrl}) => (
      <a href={url} className='client-portal-module' key={name}>
        <div className='client-portal-module__name'>{name}</div>
        <img src={imageUrl} className='client-portal-module__image' />
      </a>
    ))}
  </div>
)

ClientPortalModules.defaultProps = {
  modules: [],
}

ClientPortalModules.propTypes = {
  modules: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
  })).isRequired,
}

export default ClientPortalModules
