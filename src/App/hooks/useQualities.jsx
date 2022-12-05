import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'

import { toast } from 'react-toastify'

import qualitiesService from '../service/qualities.service'

const QualitiesContext = React.createContext ()

export const useQualities = () => {
  return useContext ( QualitiesContext )
}

export const QualitiesProvider = ( { children } ) => {
  const [ isLoading, setLoading ] = useState ( true )
  const [ qualities, setQualities ] = useState ( [] )
  const [ error, setError ] = useState ( null )

  useEffect ( () => {
    if ( !error !== null ) {
      toast ( error )
      setError ( null )
    }
  }, [ error ] )

  useEffect ( () => {
    getQualitiesList ()
  }, [] )

  async function getQualitiesList () {
    try {
      const { content } = await qualitiesService.get ()
      setQualities ( content )
      setLoading ( false )
    } catch ( error ) {
      errorCatcher ( error )
    }
  }

  function getQualities ( id ) {
    // const userQualities = []

    return qualities.find ( qual => qual._id === id )
  }

  function errorCatcher ( error ) {
    const { message } = error.response.data
    setError ( message )
  }

  return (
    <QualitiesContext.Provider value={{
      isLoading,
      qualities,
      getQualities,
    }}>
      {children}
    </QualitiesContext.Provider> )
}
QualitiesProvider.propTypes = {
  children: PropTypes.oneOfType ( [ PropTypes.arrayOf ( PropTypes.node ), PropTypes.node ] ),
}