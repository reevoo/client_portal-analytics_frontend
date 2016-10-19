import React, { PropTypes } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import './client_portal_dialog.scss'

import colours from '!!sass-variable-loader!client_portal-assets/dist/sass/colours.scss' // Load Reevoo colour variables

const dialogTitleStyle = {
  backgroundColor: colours.darkSkyBlue,
  color: '#fff',
  fontSize: '20px',
  fontWeight: 'normal',
  padding: '18px 30px',
}

const dialogBodyStyle = {
  padding: '25px 30px',
}

const dialogActionsContainerStyle = {
  borderTop: '1px solid #dbdbdb',
  textAlign: 'left',
}

const ClientPortalDialog = ({ children, open, title, onApply, onCancel }) => (
  <Dialog
    title={title}
    titleStyle={dialogTitleStyle}
    actions={[
      <FlatButton label='Apply' onTouchTap={onApply} />,
      <FlatButton label='Cancel' onTouchTap={onCancel} />,
    ]}
    actionsContainerStyle={dialogActionsContainerStyle}
    bodyStyle={dialogBodyStyle}
    modal={false}
    open={open}
    onRequestClose={onCancel}
    >
    {children}
  </Dialog>
)

ClientPortalDialog.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  open: PropTypes.bool,
  title: PropTypes.string,
  onApply: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}

export default ClientPortalDialog
