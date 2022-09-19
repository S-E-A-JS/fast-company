import React from "react";
import Bookmark from "./bookmark";
import Quality from "./quality";

const User = (props) => {
    return (
        <>
            <tr key={props.user._id}>
                <td>{props.user.name}</td>
                <td>
                    {props.user.qualities.map((quality) => (
                        <Quality
                            key={quality._id}
                            qualitie={quality}
                        />
                    ))
                    }
                </td>

                <td>{props.user.profession.name}</td>
                <td>{props.user.completedMeetings}</td>
                <td>{props.user.rate}</td>
                <Bookmark
                    onSwitchBookmarkStatus={props.onBookmarkSwitch}
                    {...props.user}
                />
                <td>
                    <button
                        onClick={() => props.onDelete(props.user._id)}
                        className="btn btn-danger"
                    >
                        delete
                    </button>
                </td>
            </tr>
        </>
    )
};

export default User;