import React, { Component, PropTypes } from 'react'

import Checklist from '../../checklist/checklist'
import { ClientPortalDialog, ClientPortalDialogSectionTitle } from '../../client_portal_dialog/client_portal_dialog'

class TrkrefDialog extends Component {
  constructor (props) {
    super(props)

    this.handleApply = this.handleApply.bind(this)
    this.handleTrkrefsChange = this.handleTrkrefsChange.bind(this)

    this.state = { trkrefs: props.selectedValues }
  }

  handleApply () {
    this.props.onApply(this.state.trkrefs)
  }

  handleTrkrefsChange (trkrefs) {
    this.setState({ trkrefs })
  }

  render () {
    const { allowedValues, open, selectedValues, onCancel } = this.props

    return (
      <ClientPortalDialog
        open={open}
        title="Select your TRKREF's"
        onApply={this.handleApply}
        onCancel={onCancel}
      >
        <ClientPortalDialogSectionTitle title='Customise Websites' />
        <Checklist
          allowedValues={allowedValues}
          selectedValues={selectedValues}
          onChange={this.handleTrkrefsChange}
          />
      </ClientPortalDialog>
    )
  }
}

TrkrefDialog.propTypes = {
  allowedValues: PropTypes.arrayOf(PropTypes.string),
  open: PropTypes.bool,
  selectedValues: PropTypes.arrayOf(PropTypes.string),
  onApply: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}

export default TrkrefDialog
