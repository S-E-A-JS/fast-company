import React, {useState} from "react";
import api from "../api";
import Bookmark from "./bookmark";

const User = (props) => {
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
            {users.map((user) => (
                <tr key={user._id}>
                    <td>{user.name}</td>
                    {/*<td>
                            {user.qualities.map((item) => (
                                <span className={"badge m-1 bg-" + item.color} key={item._id}>
                                        {item.name}
                                    </span>
                            ))}
                        </td>*/}
                    <td>{user.profession.name}</td>
                    <td>{user.completedMeetings}</td>
                    <td>{user.rate} /5</td>
                    {/*<td>{user.bookmark === false
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
                        </td>*/}
                    <Bookmark
                        key={user._id}
                        onSwitchBookmarkStatus={handleSwitchBookmarkStatus}
                    />
                    <td>
                        <button
                            onClick={() => handleDelete(user._id)}
                            className="btn btn-danger"
                        >
                            delete
                        </button>
                    </td>
                </tr>
            ))}
        </>
    )
};

export default User;