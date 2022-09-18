import React from "react";

const Bookmark = (props) => {

    return (
        <>
            <td>
                <button
                    className='btn'
                    onClick={() => props.onSwitchBookmarkStatus(props._id)}
                >
                    <i className="bi bi-bookmark"></i>
                </button>
                {/*{user.bookmark === false
                    ? (<button
                        className="btn"
                        onClick={() => handleSwitchBookmarkStatus(user._id)}
                    >
                        <i className="bi bi-bookmark"></i>
                    </button>)
                    : (<button className="btn" onClick={() => handleSwitchBookmarkStatus(user._id)}>
                        <i className="bi bi-bookmark-check"></i>
                    </button>)}*/}
            </td>
        </>


    )
};

export default Bookmark;