import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'

const MultiSelectField = ( {
  options,
  onChange,
  name,
  label,
} ) => {
  const optionsArray = !Array.isArray ( options ) && typeof ( options ) === 'object'
    ? Object.keys ( options ).map ( optionName => ( {
      label: options[optionName].name,
      value: options[optionName]._id,
    } ) )
    : options

  const handleChange = value => {
    onChange ( {
      name,
      value,
    } )
  }

  return (
    <div className='mb-4'>
      <label className='form-label'>
        {label}
      </label>
      <Select
        isMulti
        closeMenuOnSelect={false}
        options={optionsArray}
        onChange={handleChange}
        className='basic-multy-select'
        classNamePrefix='select'
      />
    </div>
  )
}
MultiSelectField.propTypes = {
  options: PropTypes.oneOfType ( [ PropTypes.object, PropTypes.array ] ),
  onChange: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
}

export default MultiSelectField