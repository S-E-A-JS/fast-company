import React from 'react'
import PropTypes from 'prop-types'

const RadioField = ( {
  options,
  name,
  onChange,
  value,
  label,
} ) => {
  return (
    <div className="mb-4">
      <label className='form-label'>
        {label}
      </label>
      {options.map ( option =>
        <div
          key={option.name + '_' + option.value}
          className="form-check form-check-inline">
          <input
            type="radio"
            name={name}
            id={option.name + '_' + option.value}
            checked={option.value === value}
            value={option.value}
            onChange={onChange}
            className="form-check-input"
          />
          <label
            htmlFor={option.name + '_' + option.value}
            className="form-check-label">
            {option.name}
          </label>
        </div> )}

    </div>
  )
}
RadioField.propTypes = {
  options: PropTypes.array,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  label: PropTypes.string,
}

export default RadioField