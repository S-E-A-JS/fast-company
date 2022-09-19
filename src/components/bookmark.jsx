import React from "react";

const Bookmark = (props) => {
    const {bookmark} = props;

    const switchClasses = () => {
        classes += bookmark === false ? 'bi-bookmark' : 'bi-bookmark-check';
        return classes;
    }
    let classes = 'bi '

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