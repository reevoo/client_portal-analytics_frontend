import React, { Component, PropTypes } from 'react'

class SquareRadioGroup extends Component {
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
      <ul className='square-radio-group'>
        {values.map(({ label, value }) => (
          <li className='square-radio-button' key={value}>
            <input
              className='square-radio-button__input'
              type='radio'
              name={name}
              value={value}
              id={value}
              checked={value === this.state.value}
              onChange={this.handleChange(value)}
              />
            <label className='square-radio-button__label' htmlFor={value}>{label}</label>
          </li>
        ))}
      </ul>
    )
  }
}

SquareRadioGroup.propTypes = {
  name: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  defaultValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default SquareRadioGroup
