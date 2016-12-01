import React, { Component, PropTypes } from 'react'

import Checklist from '../../checklist/checklist'
import { ClientPortalDialog, ClientPortalDialogSectionTitle } from '../../client_portal_dialog/client_portal_dialog'

class ExportDialog extends Component {
  constructor (props) {
    super(props)

    this.handleApply = this.handleApply.bind(this)
    this.handleTypesChange = this.handleTypesChange.bind(this)

    this.state = { types: [] }
  }

  handleApply () {
    this.props.onApply(this.state.types)
  }

  handleTypesChange (types) {
    this.setState({ types })
  }

  render () {
    const { open, onCancel } = this.props
    const { types } = this.state

    return (
      <ClientPortalDialog
        open={open}
        title='Export this filter set'
        onApply={this.handleApply}
        onCancel={onCancel}
      >
        <ClientPortalDialogSectionTitle title='How would you like to export this?' />
        <Checklist
          allowedValues={['Image', 'PDF']}
          selectedValues={types}
          onChange={this.handleTypesChange}
          />
      </ClientPortalDialog>
    )
  }
}

ExportDialog.propTypes = {
  open: PropTypes.bool,
  onApply: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}

export default ExportDialog
