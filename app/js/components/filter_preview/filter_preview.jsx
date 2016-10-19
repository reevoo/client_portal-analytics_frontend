import React, { Component, PropTypes } from 'react'
import Chip from 'material-ui/Chip'
import FontIcon from 'material-ui/FontIcon'

import DateRangeDialog from '../dialogs/date_range_dialog/date_range_dialog'
import TrkrefDialog from '../dialogs/trkref_dialog/trkref_dialog'

const filterChip = {
  borderColor: '#dedede',
  borderRadius: '25px',
  borderStyle: 'solid',
  borderWidth: '1px',
  fontSize: '14px',
  marginRight: '20px',
}

const filterChipLabel = {
  lineHeight: 1.3,
  padding: '10px 20px',
}

const filterTitleIcon = {
  color: 'inherit',
  fontSize: '15px',
  marginLeft: '10px',
  transition: 'none',
}

class FilterPreview extends Component {
  constructor () {
    super()

    this.closeEditDialog = this.closeEditDialog.bind(this)
    this.openEditDialog = this.openEditDialog.bind(this)
    this.saveFilter = this.saveFilter.bind(this)

    this.state = { open: false }
  }

  closeEditDialog () {
    this.setState({ open: false })
  }

  openEditDialog () {
    this.setState({ open: true })
  }

  saveFilter (value) {
    this.props.onEdit(value)
    this.closeEditDialog()
  }

  render () {
    const { name, allowedValues, selectedValues } = this.props

    let dialog = null
    switch (name) {
      case 'Date Range':
        dialog = <DateRangeDialog
          open={this.state.open}
          selectedValue={selectedValues[0]}
          onApply={this.saveFilter}
          onCancel={this.closeEditDialog}
          />
        break
      case 'Retailer Trkref':
        dialog = <TrkrefDialog
          allowedValues={allowedValues}
          open={this.state.open}
          selectedValues={selectedValues}
          onApply={this.saveFilter}
          onCancel={this.closeEditDialog}
          />
        break
    }

    return (
      <div className='filter-preview' onClick={this.openEditDialog}>
        <h6 className='filter-preview__title'>
          {name}
          <FontIcon className='icon-edit_pencil' style={filterTitleIcon} />
        </h6>
        <div className='filter-preview__values'>
          {selectedValues.map((value) => (
            <Chip
              key={value}
              backgroundColor='transparent'
              style={filterChip}
              labelStyle={filterChipLabel}
              >
                {value}
            </Chip>
          ))}
        </div>
        {dialog}
      </div>
    )
  }
}

FilterPreview.propTypes = {
  name: PropTypes.string.isRequired,
  allowedValues: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedValues: PropTypes.arrayOf(PropTypes.string).isRequired,
  onEdit: PropTypes.func.isRequired,
}

export default FilterPreview
