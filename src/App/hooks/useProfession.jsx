import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'

import { toast } from 'react-toastify'

import professionService from '../service/profession.service'

const ProfessionContext = React.createContext ()

export const useProfession = () => {
  return useContext ( ProfessionContext )
}

export const ProfessionProvider = ( { children } ) => {
  const [ isLoading, setLoading ] = useState ( true )
  const [ profession, setProfession ] = useState ( [] )
  const [ error, setError ] = useState ( null )

  useEffect ( () => {
    if ( error !== null ) {
      toast ( error )
      setError ( null )
    }
  }, [ error ] )

  useEffect ( () => {
    getProfessionsList ()
  }, [] )

  async function getProfessionsList () {
    try {
      const { content } = await professionService.get ()
      setProfession ( content )
      setLoading ( false )
    } catch ( error ) {
      errorCatcher ( error )
    }
  }

  function getProfession ( id ) {
    return profession.find ( p => p._id === id )
  }

  function errorCatcher ( error ) {
    const { message } = error.response.data
    setError ( message )
  }

  return (
    <ProfessionContext.Provider value={{
      isLoading,
      profession,
      getProfession,
    }}>
      {children}
    </ProfessionContext.Provider>
  )
}
ProfessionProvider.propTypes = {
  children: PropTypes.oneOfType ( [ PropTypes.arrayOf ( PropTypes.node ), PropTypes.node ] ),
}