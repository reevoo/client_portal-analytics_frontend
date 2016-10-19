import React, { Component, PropTypes } from 'react'

import { ClientPortalDialog, ClientPortalDialogSectionTitle } from '../../client_portal_dialog/client_portal_dialog'
import SquareRadioGroup from '../../square_radio_group/square_radio_group'

class DateRangeDialog extends Component {
  constructor (props) {
    super(props)

    this.handleApply = this.handleApply.bind(this)
    this.handleDateRangeChange = this.handleDateRangeChange.bind(this)

    this.state = { dateRange: props.selectedValue }
  }

  handleApply () {
    this.props.onApply(this.state.dateRange)
  }

  handleDateRangeChange (dateRange) {
    this.setState({ dateRange })
  }

  render () {
    const { onCancel, open, selectedValue } = this.props

    const radioValues = [
      { label: '30 Days', value: 'last 30 days' },
      { label: '90 Days', value: 'last 3 months' },
      { label: '6 Months', value: 'last 6 months' },
      { label: '9 Months', value: 'last 9 months' },
      { label: '12 Months', value: 'last year' },
    ]

    return (
      <ClientPortalDialog
        open={open}
        title='Select a date range'
        onApply={this.handleApply}
        onCancel={onCancel}
      >
        <ClientPortalDialogSectionTitle title='Select a date range' />
        <SquareRadioGroup
          name='dateRange'
          values={radioValues}
          defaultValue={selectedValue}
          onChange={this.handleDateRangeChange}
          />
      </ClientPortalDialog>
    )
  }
}

DateRangeDialog.propTypes = {
  open: PropTypes.bool,
  onApply: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  selectedValue: PropTypes.string,
}

export default DateRangeDialog
