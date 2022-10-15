import React, { useState, useEffect } from "react";
import query from "query-string";
import { useLocation, useParams } from "react-router-dom";

import userApi from "../api/fake.api/user.api";

const User = () => {
 //  const { pathname } = useLocation();
 let user;
 useEffect(() => {
  userApi.getById().then((data) => (user = data));
 });
 console.log(user);
 //  const pathName = location.pathname;
 return (
  <>
   <h1>{} Юзер</h1>
  </>
 );
};

export default User;
