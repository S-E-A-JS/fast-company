import React from 'react'
import PropTypes from 'prop-types'

const SearchInput = ( { changeTextState, value } ) => (
  <input type="text"
    onChange={changeTextState}
    value={value}
  /> )
SearchInput.propTypes = {
  value: PropTypes.string,
  changeTextState: PropTypes.func,
}

export default SearchInput