import React from "react";

const SearchStatus = ({usersCount}) => {

    const renderPhrase = (number) => {
        const lastOne = Number(number.toString().slice(-1));
        if (number > 4 && number < 15) return "человек тусанет";
        if ([2, 3, 4].indexOf(lastOne) >= 0) return "человека тусанут";
        if (lastOne === 1) return "человек тусанет";
        return "человек тусанет";
    };

    return (
        <>
            <h2>
                <span
                    className={"badge " + (usersCount > 0 ? "bg-primary" : "bg-danger")}
                >
                    {usersCount > 0
                        ? `${usersCount + " " + renderPhrase(usersCount)} с тобой сегодня`
                        : "Никто с тобой не тусанет"}
                </span>
            </h2>
        </>
    )
}

export default SearchStatus;