import React from 'react'
import { Route } from 'react-router-dom'

import NavBar from './App/components/navbar'
import Users from './App/components/users'
import Main from './App/components/main'
import Login from './App/components/login'
import User from './App/components/user'

function App () {
  const s = 0
  return (
    <>
      <NavBar />
      <Route path="/" exact component={Main} />
      <Route path="/login" component={Login} />
      <Route path="/users/:userId" component={User} />
      <Route path="/users" exact component={Users} />
    </>
  )
}

export default App