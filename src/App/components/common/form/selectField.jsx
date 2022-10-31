import React from 'react'
import PropTypes from 'prop-types'

const SelectField = ( {
  label,
  value,
  onChange,
  defaultOption,
  options,
  error,
} ) => {
  const getInputClasses = () => {
    return 'form-select' + ( error
      ? ' is-invalid'
      : '' )
  }
  const optionsArray = !Array.isArray ( options ) && typeof ( options ) === 'object'
    ? Object.keys ( options ).map ( optionName => ( {
      name: options[optionName].name,
      value: options[optionName]._id,
    } ) )
    : options

  return (
    <div className='mb-4'>
      <label className='form-label'
        htmlFor="validationCustom04" >
        {label}
      </label>
      <select className={getInputClasses ()}
        id="validationCustom04"
        name='profession'
        value={value}
        onChange={onChange}
      >
        <option
          disabled
          value="">
          {defaultOption}
        </option>
        {
          optionsArray && optionsArray.map ( option =>
            <option key={option.value}
              value={option.value}>
              {option.name}
            </option> )
        }
      </select>
      {error && <div className="invalid-feedback">
        {error}
      </div>}
    </div> )
}
SelectField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  defaultOption: PropTypes.string,
  options: PropTypes.oneOfType ( [ PropTypes.object, PropTypes.array ] ),
  error: PropTypes.string,
}

export default SelectField