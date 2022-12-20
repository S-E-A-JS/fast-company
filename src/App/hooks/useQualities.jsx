import React, { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import PropTypes from "prop-types"
import qualityService from "../services/quality.service"

const QualitiesContext = React.createContext ()

export const useQualities = () => {
  return useContext ( QualitiesContext )
}

export const QualitiesProvider = ( { children } ) => {
  const [ qualities, setQualities ] = useState ( [] )
  const [ error, setError ] = useState ( null )
  const [ isLoading, setLoading ] = useState ( true )

  const getQualities = async () => {
    try {
      const { content } = await qualityService.fetchAll ()
      setQualities ( content )
      setLoading ( false )
    } catch ( error ) {
      errorCatcher ( error )
    }
  }
  useEffect ( () => {
    getQualities ()
  }, [] )

  const getQuality = id => {
    return qualities.find ( q => {
      return q._id === id
    } )
  }

  // Получить массив объектов Qualities для юзера
  const getQualitiesList = arrayQualId => {
    return arrayQualId.map ( q => getQuality ( q ) )
  }

  function errorCatcher ( error ) {
    const { message } = error.response.data
    setError ( message )
  }
  useEffect ( () => {
    if ( error !== null ) {
      toast ( error )
      setError ( null )
    }
  }, [ error ] )

  return (
    <QualitiesContext.Provider
      value={{
        qualities,
        getQuality,
        getQualitiesList,
        isLoading,
      }}
    >
      {children}
    </QualitiesContext.Provider>
  )
}

QualitiesProvider.propTypes = {
  children: PropTypes.oneOfType ( [
    PropTypes.arrayOf ( PropTypes.node ),
    PropTypes.node,
  ] ),
}