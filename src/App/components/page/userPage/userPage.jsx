import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import api from '../../../api'

import Qualities from '../../ui/qualities'

const UserPage = ( { userId } ) => {
  const [ user, setUser ] = useState ( )
  const hist = useHistory ()

  useEffect ( () => {
    api.users.getById ( userId ).then ( data => setUser ( data ) )
  }, [] )

  const handlePushToEditPage = () => {
    hist.push ( `${hist.location.pathname}/edit` )
  }

  if ( user ) {
    return (
      <div>
        <h1>{user.name}</h1>
        <h2>Профессия: {user.profession.name}</h2>
        <Qualities qualities={user.qualities} />
        <p>completedMeetings: {user.completedMeetings}</p>
        <h2>Rate: {user.rate}</h2>
        <button
          onClick={handlePushToEditPage}
        >
    Изменить
        </button>
      </div> )
  } else {
    return ( <h1>Loading...</h1> )
  }
}

UserPage.propTypes = {
  userId: PropTypes.string.isRequired,
}

export default UserPage