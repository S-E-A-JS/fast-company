import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import userApi from "../api/fake.api/user.api";
import UserInfo from "./userInfo";

const User = () => {
 const [selectedUser, setSelectedUser] = useState();
 const { userId } = useParams();
 useEffect(() => {
  userApi.getById(userId).then((data) => setSelectedUser(data));
 }, []);
 if (!selectedUser) return <h1>Loading...</h1>;

 return <UserInfo {...selectedUser} />;
};

export default User;
