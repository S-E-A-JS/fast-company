import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

import api from '../../../api'

import Qualities from '../../ui/qualities'
import EditForm from '../editForm'

const UserPage = ( { userId } ) => {
  const location = useLocation ()
  const [ user, setUser ] = useState ( )

  useEffect ( () => {
    api.users.getById ( userId ).then ( data => setUser ( data ) )
  }, [] )

  if ( user ) {
    if ( location.pathname !== `/users/${userId}/edit` ) {
      return (
        <div>
          <h1>{user.name}</h1>
          <h2>Профессия: {user.profession.name}</h2>
          <Qualities qualities={user.qualities} />
          <p>completedMeetings: {user.completedMeetings}</p>
          <h2>Rate: {user.rate}</h2>
          <Link to={`/users/${userId}/edit`}><button>Изменить</button></Link>
        </div>
      )
    } else {
      return (
        <EditForm
          userId={userId}
          userData={user}
        />
      )
    }
  } else {
    return <h1>Loading</h1>
  }
}

UserPage.propTypes = {
  userId: PropTypes.string.isRequired,
}

export default UserPage