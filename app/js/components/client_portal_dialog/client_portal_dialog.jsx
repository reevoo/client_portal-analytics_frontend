import React, { PropTypes } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import './client_portal_dialog.scss'

import colours from '!!sass-variable-loader!client_portal-assets/dist/sass/colours.scss' // Load Reevoo colour variables

const dialogStyles = {
  title: {
    backgroundColor: colours.darkSkyBlue,
    color: '#fff',
    fontSize: '20px',
    fontWeight: 'normal',
    padding: '18px 30px',
  },
  body: {
    padding: '25px 30px',
  },
  actionsContainer: {
    borderTop: '1px solid #dbdbdb',
    textAlign: 'left',
  },
}

const ClientPortalDialogSectionTitle = ({ title }) => (
  <h6 className='dialog__section-title'>{title}</h6>
)

ClientPortalDialogSectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
}

const ClientPortalDialogSection = ({ children, last }) => (
  <section className={`dialog__section ${last ? 'dialog__section--last' : ''}`}>
    {children}
  </section>
)

ClientPortalDialogSection.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  last: PropTypes.bool,
}

const ClientPortalDialog = ({ children, open, title, onApply, onCancel }) => {
  let actionButtons = [
    <FlatButton label='Cancel' onTouchTap={onCancel} />,
  ]

  if (onApply) {
    actionButtons = [
      <FlatButton label='Apply' onTouchTap={onApply} primary={true} />,
      ...actionButtons,
    ]
  }

  return (
    <Dialog
      autoScrollBodyContent={true}
      repositionOnUpdate={false}
      title={title}
      titleStyle={dialogStyles.title}
      actions={actionButtons}
      actionsContainerStyle={dialogStyles.actionsContainer}
      bodyStyle={dialogStyles.body}
      modal={false}
      open={open}
      onRequestClose={onCancel}
      >
      {children}
    </Dialog>
  )
}

ClientPortalDialog.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  open: PropTypes.bool,
  title: PropTypes.string,
  onApply: PropTypes.func,
  onCancel: PropTypes.func.isRequired,
}

export { ClientPortalDialog, ClientPortalDialogSection, ClientPortalDialogSectionTitle }
