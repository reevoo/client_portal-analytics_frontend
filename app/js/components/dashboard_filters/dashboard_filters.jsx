import React, { PropTypes } from 'react'
import { Card, CardText } from 'material-ui/Card'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import Checkbox from 'material-ui/Checkbox'

import './dashboard_filters.scss'

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

const DashboardFilters = ({ filters, changeFilter }) => (
  <Card style={dashboardFiltersStyle}>
    <CardText>
      {filters.map(({ name, allowedValues, selectedValue }) => {
        const FilterType = Array.isArray(selectedValue) ? MultipleFilter : DropdownFilter

        return <FilterType
          key={name}
          name={name}
          allowedValues={allowedValues}
          selectedValue={selectedValue}
          onChange={changeFilter}
          />
      })}
    </CardText>
  </Card>
)

DashboardFilters.propTypes = {
  filters: PropTypes.array.isRequired,
  changeFilter: PropTypes.func.isRequired,
}

export default DashboardFilters
