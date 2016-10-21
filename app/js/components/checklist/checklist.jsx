import React, { Component, PropTypes } from 'react'
import Checkbox from 'material-ui/Checkbox'

import './checklist.scss'

class Checklist extends Component {
  constructor (props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)

    this.state = { values: props.selectedValues }
  }

  handleChange (value) {
    return (event, isInputChecked) => {
      const selectedValues = this.state.values
      const values = isInputChecked
        ? [ ...selectedValues, value ]
        : selectedValues.filter((v) => v !== value)

      this.setState({ values }, () => this.props.onChange(values))
    }
  }

  render () {
    const { allowedValues } = this.props
    const selectedValues = this.state.values

    return (
      <ul className='checklist'>
        {allowedValues.map((value) =>
          <li key={value} className='checklist__item'>
            <Checkbox
              key={value}
              label={value}
              checked={selectedValues.indexOf(value) >= 0}
              onCheck={this.handleChange(value)}
              />
          </li>
        )}
      </ul>
    )
  }
}

Checklist.propTypes = {
  allowedValues: PropTypes.array.isRequired,
  selectedValues: PropTypes.array,
  onChange: PropTypes.func.isRequired,
}

export default Checklist
