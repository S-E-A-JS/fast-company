import React from "react";
import {useState} from "@types/react";
import api from "../api";

const Quality = () => {
    const [users, setUsers] = useState(api.users.fetchAll());

    return (
        <td>
            {user.qualities.map((item) => (
                <span
                    className={"badge m-1 bg-" + item.color}
                    key={item._id}>
                    {item.name}
                </span>
            ))}
        </td>
    )
}

export default Quality;