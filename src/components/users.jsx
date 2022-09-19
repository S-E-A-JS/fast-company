import React, {useState} from "react";
import api from "../api"
import User from "./user";
import SearchStatus from './searchStatus'

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };
    const handleSwitchBookmarkStatus = (userId) => {
        const userBookmarkStatus = users.map(user => user._id === userId ? {...user, bookmark: !user.bookmark} : user)
        setUsers(userBookmarkStatus)
    };

    return (
        <>
            <SearchStatus
                usersCount={users.length}
            />
            {users.length > 0 && (
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Качества</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Встретился, раз</th>
                        <th scope="col">Оценка</th>
                        <th scope="col">Избранное</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <User
                            key={user._id}
                            onDelete={handleDelete}
                            onBookmarkSwitch={handleSwitchBookmarkStatus}
                            user={user}/>
                    ))
                    }
                    </tbody>
                </table>
            )}
        </>
    );
};

export default Users;
