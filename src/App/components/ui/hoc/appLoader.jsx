import { useDispatch, useSelector } from "react-redux"
import PropTypes from "prop-types"
import { getIsLoggedIn, getUserDataUpdateStatus, getUsersLoadingStatus, loadUsersList } from "../../../store/users"
import { useEffect } from "react"
import { loadQualitiesList } from "../../../store/qualities"
import { loadProfessionsList } from "../../../store/professions"

const AppLoader = ( { children } ) => {
  const dispatch = useDispatch ()
  const isLoggedIn = useSelector ( getIsLoggedIn () )
  const userWasUpdate = useSelector ( getUserDataUpdateStatus () )
  const usersStatusLoading = useSelector ( getUsersLoadingStatus () )

  useEffect ( () => {
    dispatch ( loadQualitiesList () )
    dispatch ( loadProfessionsList () )
    if ( isLoggedIn ) {
      dispatch ( loadUsersList () )
    }
  }, [ isLoggedIn, userWasUpdate ] )
  if ( usersStatusLoading ) return "Loading"
  return children
}
AppLoader.propTypes = {
  children: PropTypes.oneOfType ( [ PropTypes.arrayOf ( PropTypes.node ), PropTypes.node ] ),
}

export default AppLoader