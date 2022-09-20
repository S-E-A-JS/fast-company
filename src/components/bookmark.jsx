import React from "react";

const Bookmark = (props) => {
    const {bookmark} = props;

    const switchClasses = () => {
        const classes = bookmark === false ? 'bi bi-bookmark' : 'bi bi-bookmark-check';
        return classes;
    }

    return (
        <>
            <td>
                <button
                    className='btn'
                    onClick={() => props.onSwitchBookmarkStatus(props._id)}
                >
                    <i className={switchClasses()}></i>
                </button>
            </td>
        </>


    )
};

export default Bookmark;