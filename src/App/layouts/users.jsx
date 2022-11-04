import React from 'react'
import { useParams } from 'react-router-dom'
import EditForm from '../components/page/editForm'

import UserPage from '../components/page/userPage'
import UsersListPage from '../components/page/usersListPage'

const Users = () => {
  const params = useParams ()
  const { userId, edit } = params
  return <>
    {userId
      ? edit
        ? <EditForm userId={userId}/>
        : <UserPage userId={userId} />
      : <UsersListPage />}
  </>
}

export default Users