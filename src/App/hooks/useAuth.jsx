import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import axios from 'axios'
import userService from '../services/user.service'
import { setTokens } from '../services/localStorage.service'

const httpAuth = axios.create ()
const AuthContext = React.createContext ()

export const useAuth = () => {
  return useContext ( AuthContext )
}

const AuthProvider = ( { children } ) => {
  const [ currentUser, setUser ] = useState ( {
  } )
  const [ error, setError ] = useState ( null )

  async function signUp ( {
    email, password, ...rest
  } ) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`

    try {
      const { data } = await httpAuth.post ( url, {
        email,
        password,
        returnSecureToken: true,
      } )
      setTokens ( data )
      await createUser ( {
        _id: data.localId,
        email,
        ...rest,
      } )
    } catch ( error ) {
      errorCatcher ( error )
      const { code, message } = error.response.data.error
      console.log ( code, message )
      if ( code === 400 ) {
        if ( message === 'EMAIL_EXISTS' ) {
          const errorObject = {
            email: 'Пользователь с таким Email уже существует',
          }
          throw errorObject
        }
      }
    }
  }

  async function logIn ( {
    email, password, ...rest
  } ) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`

    let pass = false

    try {
      const { data } = await httpAuth.post ( url, {
        email,
        password,
        returnSecureToken: true,
      } )
      setTokens ( data )
      pass = true
    } catch ( error ) {
      errorCatcher ( error )
      const { code, message } = error.response.data.error
      console.log ( code, message )
      toast ( error )
      if ( code === 400 ) {
        if ( ( message === 'EMAIL_NOT_FOUND' ) || message === 'INVALID_PASSWORD' ) {
          const errorObject = {
            email: 'Данные пользователя введены некорректно',
            password: 'Данные пользователя введены некорректно',
          }
          throw ( errorObject )
        } else {
          toast.error ( 'Что то пошло не так' )

          throw new Error ( 'Что то пошло не так' )
        }
      } else {
        toast.error ( 'Что то пошло не так' )
        throw new Error ( 'Что то пошло не так' )
      }
    }
    return pass
  }

  async function createUser ( data ) {
    try {
      const { content } = userService.create ( data )
      setUser ( content )
    } catch ( error ) {
      errorCatcher ( error )
    }
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
    <AuthContext.Provider value={{
      signUp,
      currentUser,
      logIn,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.oneOfType ( [
    PropTypes.arrayOf ( PropTypes.node ),
    PropTypes.node,
  ] ),
}

export default AuthProvider