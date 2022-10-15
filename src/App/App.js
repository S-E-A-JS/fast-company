import React from "react";
import { Route, Switch } from "react-router-dom";

import NavBar from "./components/navbar";
import Users from "./components/users";
import Main from "./components/main";
import Login from "./components/login";
import User from "./components/user";

function App() {
 return (
  <div>
   <NavBar />
   <Switch>
    <Route path="/" exact component={Main} />
    <Route path="/login" component={Login} />
    <Route path="/users/:userId">
     <User />
    </Route>
    <Route path="/users" component={Users} />
   </Switch>
  </div>
 );
}

export default App;
