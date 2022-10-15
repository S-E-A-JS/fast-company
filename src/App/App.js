import React from "react";
import { Route } from "react-router-dom";

import NavBar from "./components/navbar";
import Users from "./components/users";
import Main from "./components/main";
import Login from "./components/login";
import User from "./components/user";

function App() {
 return (
  <>
   <NavBar />
   <Route path="/" exact component={Main} />
   <Route path="/login" component={Login} />
   <Route path="/users/:userId" component={User} />
   <Route path="/users" exact component={Users} />
  </>
 );
}

export default App;
