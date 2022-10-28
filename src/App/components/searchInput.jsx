import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const SearchInput = ( { selectedItem, changeTextState } ) => {
  const [ text, setText ] = useState ( {
    searchData: '',
  } )
  useEffect ( () => {
    if ( selectedItem ) {
      setText ( {
        searchData: '',
      } )
    }
  }, [ selectedItem ] )
  useEffect ( () => {
    changeTextState ( text )
  }, [ text ] )
  // вывод вводимого текста в поле инпута
  const handleChange = ( { target } ) => {
    setText ( prevState => ( {
      prevState,
      [target.name]: target.value,
    } ) )
  }

  return (
    <input type="text"
      name='searchData'
      onChange={handleChange}
      value={text.searchData}
    /> )
}
SearchInput.propTypes = {
  selectedItem: PropTypes.object,
  changeTextState: PropTypes.func,
}

export default SearchInput