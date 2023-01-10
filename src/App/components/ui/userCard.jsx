import React from "react"
import { useHistory } from "react-router-dom"
import { useSelector } from "react-redux"
import PropTypes from "prop-types"

import { getProfessionsById } from "../../store/professions"
import { getCurrentUserData } from "../../store/users"

const UserCard = ( { user } ) => {
  const history = useHistory ()
  const currentUserData = useSelector ( getCurrentUserData () )
  const profession = useSelector ( getProfessionsById ( currentUserData.profession ) )

  const handleClick = () => {
    history.push ( history.location.pathname + "/edit" )
  }

  return (
    <div className="card mb-3">
      <div className="card-body">
        {currentUserData._id === user._id && (
          <button
            className="position-absolute top-0 end-0 btn btn-light btn-sm"
            onClick={handleClick}
          >
            <i className="bi bi-gear"></i>
          </button>
        )}

        <div className="d-flex flex-column align-items-center text-center position-relative">
          <img
            src={user.image}
            className="rounded-circle"
            width="150"
          />
          <div className="mt-3">
            <h4>{user.name}</h4>
            <p className="text-secondary mb-1">
              {profession.name}
            </p>
            <div className="text-muted">
              <i
                className="bi bi-caret-down-fill text-primary"
                role="button"
              ></i>
              <i
                className="bi bi-caret-up text-secondary"
                role="button"
              ></i>
              <span className="ms-2">{user.rate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
UserCard.propTypes = {
  user: PropTypes.object,
}

export default UserCard