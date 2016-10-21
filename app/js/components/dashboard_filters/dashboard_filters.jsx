import React, { Component, PropTypes } from 'react'
import { Card, CardText } from 'material-ui/Card'

import FilterPreview from '../filter_preview/filter_preview'

import './dashboard_filters.scss'

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
        {filters.map(({ name, allowedValues, selectedValue }) => (
          <FilterPreview
            key={name}
            name={name}
            allowedValues={allowedValues}
            selectedValues={Array.isArray(selectedValue) ? selectedValue : [selectedValue]}
            onEdit={this.handleFilterChange(name)}
            />
        ))}
      </CardText>
    </Card>
  }
}

DashboardFilters.propTypes = {
  filters: PropTypes.array.isRequired,
  changeFilter: PropTypes.func.isRequired,
}

export default DashboardFilters
