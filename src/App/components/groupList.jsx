import React from "react";
import PropTypes from "prop-types";

const GroupList = ({ item: items, valueProperty, contentProperty }) => {
    console.log(items);
    return (
        <ul className="list-group">
            {Object.keys(items).map(item =>
                <li key={items[item][valueProperty]} className="list-group-item">{items[item][contentProperty]}</li>
            )}
        </ul>
    );
};
GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};
GroupList.propTypes = {
    item: PropTypes.object.isRequired,
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired
};

export default GroupList;
