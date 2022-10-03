import React, { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import _ from "lodash";

import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import GroupList from "./groupList";
import api from "../api";
import SearchStatus from "./searchStatus";
import UsersTable from "./usersTable";

const Users = ({ users: Allusers, ...rest }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState([]);
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const pageSize = 8;

    useEffect(() => {
        api.professions.fetchAll().then((data) =>
            setProfessions(data), []);
    });
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };
    const clearFilter = () => {
        setSelectedProf();
    };
    const handleSort = (item) => {
        if (sortBy.iter === item) {
            setSortBy(prevState => ({ ...prevState, order: prevState.order === "asc" ? "desc" : "asc" }));
        } else {
            setSortBy({ iter: item, order: "asc" });
        }
    };

    const filteredUsersByProf = selectedProf
        ? Allusers.filter((user) => user.profession._id === selectedProf._id)
        : Allusers;

    const count = filteredUsersByProf.length;

    const sortedusers = _.orderBy(filteredUsersByProf, [sortBy.iter], [sortBy.order]);

    const userCrop = paginate(sortedusers, currentPage, pageSize);
    return (
        <div className="d-flex">
            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        selectedItem={selectedProf}
                        item={professions}
                        onItemSelect={handleProfessionSelect}
                    />
                    <button className='btn btn-secondary mt-2' onClick={clearFilter}>Очистить</button>
                </div>
            )}
            <div className="d-flex flex-column">
                <SearchStatus length={count}/>
                {count > 0 && (
                    <UsersTable users={userCrop} onSort={handleSort} {...rest}/>
                )}
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};
Users.propTypes = {
    users: PropTypes.array
};

export default Users;
