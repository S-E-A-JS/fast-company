import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Users from "./layouts/users"
import Login from "./layouts/login"
import Main from "./layouts/main"
import NavBar from "./components/ui/navBar"
import { ProfessionProvider } from "./hooks/useProfession"
import AuthProvider from "./hooks/useAuth"
import ProtectedRoute from "./components/common/protectedRoute"
import LogOut from "./layouts/logOut"
import AppLoader from "./components/ui/hoc/appLoader"

function App () {
  return (
    <div>
      <AppLoader>
        <AuthProvider>
          <NavBar />

          <ProfessionProvider>
            <Switch>
              <ProtectedRoute
                path="/users/:userId?/:edit?"
                component={Users}
              />
              <Route path="/login/:type?"
                component={Login} />
              <Route path="/logout"
                component={LogOut} />
              <Route path="/"
                exact
                component={Main} />
              <Redirect to="/" />
            </Switch>
          </ProfessionProvider>
        </AuthProvider>
      </AppLoader>
      <ToastContainer />
    </div>
  )
}

export default App