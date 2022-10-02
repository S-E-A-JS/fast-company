import React, { useEffect, useState } from "react";

import Users from "./components/users";
import userApi from "./api/fake.api/user.api";

function App () {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        userApi.fetchAll().then((data) =>
            setUsers(data), []);
    });

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };
    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
    };
    return (
        <div>
            <Users onDelete={handleDelete} onToggleBookMark={handleToggleBookMark} users={users}/>
        </div>
    );
}

export default App;
