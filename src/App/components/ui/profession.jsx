import React from "react"
import PropTypes from "prop-types"
import { useSelector } from "react-redux"

import { getProfessionsById, getProfessionsLoadingStatus } from "../../store/professions"

const Profession = ( { id } ) => {
  const professionsLoading = useSelector ( getProfessionsLoadingStatus () )
  const profession = useSelector ( getProfessionsById ( id ) )
  console.log ( profession )
  if ( !professionsLoading ) {
    return <p>{profession.name}</p>
  } else return "Loading..."
}
Profession.propTypes = {
  id: PropTypes.string,
}
export default Profession