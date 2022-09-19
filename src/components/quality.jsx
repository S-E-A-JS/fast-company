import React from "react";

const Quality = ({qualitie}) => {
    return (
        <span
            className={"badge m-1 bg-" + qualitie.color}
        >
            {qualitie.name}
        </span>
    )
}

export default Quality;