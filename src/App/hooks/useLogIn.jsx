// import React, { useContext, useState, useEffect } from 'react'
// import PropTypes from 'prop-types'
// import { toast } from 'react-toastify'
// import axios from 'axios'
// import userService from '../services/user.service'
// import { setTokens } from '../services/localStorage.service'

// const httpLogIn = axios.create ()
// const LogInContext = React.createContext ()

// export const useLogIn = () => {
//   return useContext ( LogInContext )
// }

// const LogInProvider = ( { children } ) => {
//   const [ currentUser, setUser ] = useState ( {
//   } )
//   const [ error, setError ] = useState ( null )

//   async function logIn ( {
//     email, password, ...rest
//   } ) {
//     const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`

//     try {
//       const { data } = await httpLogIn.post ( url, {
//         email,
//         password,
//         returnSecureToken: true,
//       } )
//       setTokens ( data )
//     } catch ( error ) {
//       errorCatcher ( error )
//       const { code, message } = error.response.data.error
//       console.log ( code, message )
//     }
//   }

//   function errorCatcher ( error ) {
//     const { message } = error.response.data
//     setError ( message )
//   }
//   useEffect ( () => {
//     if ( error !== null ) {
//       toast ( error )
//       setError ( null )
//     }
//   }, [ error ] )

//   return (
//     <LogInContext.Provider value={{
//       logIn,
//       currentUser,
//     }}>
//       {children}
//     </LogInContext.Provider> )
// }
// LogInProvider.propTypes = {
//   children: PropTypes.oneOfType ( [
//     PropTypes.arrayOf ( PropTypes.node ),
//     PropTypes.node,
//   ] ),
// }

// export default LogInProvider