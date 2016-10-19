import React, { Component, PropTypes } from 'react'
import { Card, CardText } from 'material-ui/Card'
import Checkbox from 'material-ui/Checkbox'
import Chip from 'material-ui/Chip'
import Dialog from 'material-ui/Dialog'
import DropDownMenu from 'material-ui/DropDownMenu'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'
import MenuItem from 'material-ui/MenuItem'

import './dashboard_filters.scss'
import colours from '!!sass-variable-loader!client_portal-assets/dist/sass/colours.scss' // Load Reevoo colour variables

console.log(colours)

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

class RadioGroup extends Component {
  constructor (props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)

    this.state = { value: props.defaultValue }
  }

  handleChange (value) {
    return () => this.setState({ value }, () => this.props.onChange(value))
  }

  render () {
    const { name, values } = this.props

    return (
      <ul className='flat-radio-group'>
        {values.map(({ label, value }) => (
          <li className='flat-radio-button' key={value}>
            <input
              className='flat-radio-button__input'
              type='radio'
              name={name}
              value={value}
              id={value}
              checked={value === this.state.value}
              onChange={this.handleChange(value)}
              />
            <label className='flat-radio-button__label' htmlFor={value}>{label}</label>
          </li>
        ))}
      </ul>
    )
  }
}

RadioGroup.propTypes = {
  name: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  defaultValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

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
      <Dialog
        title='Select a date range'
        titleStyle={dialogTitleStyle}
        actions={[
          <FlatButton label='Apply' onTouchTap={this.handleApply} />,
          <FlatButton label='Cancel' onTouchTap={onCancel} />,
        ]}
        actionsContainerStyle={dialogActionsContainerStyle}
        bodyStyle={dialogBodyStyle}
        modal={false}
        open={open}
        onRequestClose={onCancel}
      >
        <h6 className='dialog__section-title'>Select a date range</h6>

        <RadioGroup
          name='dateRange'
          values={radioValues}
          defaultValue={selectedValue}
          onChange={this.handleDateRangeChange}
          />
      </Dialog>
    )
  }
}

DateRangeDialog.propTypes = {
  open: PropTypes.bool,
  onApply: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  selectedValue: PropTypes.string,
}

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
    // const { name, values, onEdit } = this.props
    const { name, values, selectedValue } = this.props

    return (
      <div className='filter-preview' onClick={this.openEditDialog}>
        <h6 className='filter-preview__title'>
          {name}
          <FontIcon className='icon-edit_pencil' style={filterTitleIcon} />
        </h6>
        <div className='filter-preview__values'>
          {values.map((value) => (
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
        {name === 'Date Range'
          ? <DateRangeDialog
            onApply={this.saveFilter}
            onCancel={this.closeEditDialog}
            open={this.state.open}
            selectedValue={selectedValue}
            />
          : <Dialog
            title={`Select ${name}`}
            actions={[]}
            modal={false}
            open={this.state.open}
            onRequestClose={this.closeEditDialog}
          >The actions in this window were passed in as an array of React objects.</Dialog>
        }
      </div>
    )
  }
}

FilterPreview.propTypes = {
  name: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedValue: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.arrayOf(PropTypes.string).isRequired,
  ]),
  onEdit: PropTypes.func.isRequired,
}

const DropdownFilter = ({ name, allowedValues, selectedValue, onChange }) => {
  const onChangeHandler = (filterName) => (event, index, value) => onChange(filterName, value)

  return (
    <div>
      <h6 className='filter__title'>{name}</h6>
      <DropDownMenu value={selectedValue} onChange={onChangeHandler(name)}>
        {allowedValues.map((v) => <MenuItem value={v} primaryText={v} key={v} />)}
      </DropDownMenu>
    </div>
  )
}

DropdownFilter.propTypes = {
  name: PropTypes.string.isRequired,
  allowedValues: PropTypes.array.isRequired,
  selectedValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

const MultipleFilter = ({ name, allowedValues, selectedValue, onChange }) => {
  const onCheckHandler = (filterName, filterValue) => (event, isInputChecked) => {
    const values = isInputChecked
      ? [ ...selectedValue, filterValue ]
      : selectedValue.filter((v) => v !== filterValue)

    return onChange(filterName, values)
  }

  return (
    <div>
      <h6 className='filter__title'>{name}</h6>
      <div>
        {allowedValues.map((v) =>
          <Checkbox
            key={v}
            label={v}
            checked={selectedValue.indexOf(v) >= 0}
            onCheck={onCheckHandler(name, v)}
            />
        )}
      </div>
    </div>
  )
}

MultipleFilter.propTypes = {
  name: PropTypes.string.isRequired,
  allowedValues: PropTypes.array.isRequired,
  selectedValue: PropTypes.array,
  onChange: PropTypes.func.isRequired,
}

const dashboardFiltersStyle = {
  marginBottom: '30px',
}

class DashboardFilters extends Component {
  constructor () {
    super()

    this.handleFilterChange = this.handleFilterChange.bind(this)
  }

  handleFilterChange (filterName) {
    return (filterValue) => this.props.changeFilter(filterName, filterValue)
  }

  render () {
    const { filters } = this.props

    // TODO: The check for filters length is a temporal solution until we have the final Tableau dashboards setup

    return filters.length > 0 && <Card style={dashboardFiltersStyle}>
      <CardText>
        {filters.map(({ name, allowedValues, selectedValue }) => {
          return <FilterPreview
            key={name}
            name={name}
            values={Array.isArray(selectedValue) ? selectedValue : [selectedValue]}
            selectedValue={selectedValue}
            onEdit={this.handleFilterChange(name)}
            />
          // const FilterType = Array.isArray(selectedValue) ? MultipleFilter : DropdownFilter
          //
          // return <FilterType
          //   key={name}
          //   name={name}
          //   allowedValues={allowedValues}
          //   selectedValue={selectedValue}
          //   onChange={changeFilter}
          //   />
        })}
      </CardText>
    </Card>
  }
}

DashboardFilters.propTypes = {
  filters: PropTypes.array.isRequired,
  changeFilter: PropTypes.func.isRequired,
}

export default DashboardFilters
