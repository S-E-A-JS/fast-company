import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Users from './layouts/users'
import Login from './layouts/login'
import Main from './layouts/main'
import NavBar from './components/ui/navbar'
import { ToastContainer } from 'react-toastify'
import { ProfessionProvider } from './hooks/useProfession'

function App () {
  return (
    <div>
      <NavBar />
      <ProfessionProvider>
        <Switch>
          <Route path="/users/:userId?/:edit?"
            component={Users} />
          <Route path="/login/:type?"
            component={Login} />
          <Route path="/"
            exact
            component={Main} />
          <Redirect to="/" />
        </Switch>
      </ProfessionProvider>
      <ToastContainer/>
    </div>
  )
}

export default App