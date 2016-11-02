import React, { Component, PropTypes } from 'react'
import TextField from 'material-ui/TextField'

import { ClientPortalDialog } from '../../client_portal_dialog/client_portal_dialog'

class CustomViewDialog extends Component {
  constructor (props) {
    super(props)

    this.handleApply = this.handleApply.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)

    this.state = { name: '' }
  }

  handleApply () {
    const { name } = this.state
    if (name) {
      this.props.onApply(name)
    }
  }

  handleNameChange (event) {
    this.setState({ name: event.target.value })
  }

  render () {
    const { open, onCancel } = this.props
    const { name } = this.state

    return (
      <ClientPortalDialog
        open={open}
        title="Save view"
        onApply={this.handleApply}
        onCancel={onCancel}
      >
        <TextField
          floatingLabelFixed={true}
          floatingLabelText='Give it a name'
          onChange={this.handleNameChange}
          value={name}
          />
      </ClientPortalDialog>
    )
  }
}

CustomViewDialog.propTypes = {
  open: PropTypes.bool,
  onApply: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}

export default CustomViewDialog
