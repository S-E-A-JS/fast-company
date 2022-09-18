import React, {useState} from "react";
import api from "../api"
import User from "./user";

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());

    return (
        <>
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
                    {/*{users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>
                                {user.qualities.map((item) => (
                                    <span className={"badge m-1 bg-" + item.color} key={item._id}>
                                        {item.name}
                                    </span>
                                ))}
                            </td>
                            <td>{user.profession.name}</td>
                            <td>{user.completedMeetings}</td>
                            <td>{user.rate} /5</td>
                            <td>{user.bookmark === false
                                ? (<button
                                    className="btn"
                                    onClick={() => handleSwitchBookmarkStatus(user._id)}
                                >
                                    <i className="bi bi-bookmark"></i>
                                </button>)
                                : (<button className="btn" onClick={() => handleSwitchBookmarkStatus(user._id)}>
                                    <i className="bi bi-bookmark-check"></i>
                                </button>)
                            }
                            </td>
                            <td>
                                <button
                                    onClick={() => handleDelete(user._id)}
                                    className="btn btn-danger"
                                >
                                    delete
                                </button>
                            </td>
                        </tr>
                    ))}*/}
                    <User/>
                    </tbody>
                </table>
            )}
        </>
    );
};

export default Users;
