import React, { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import _ from "lodash";

import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import GroupList from "./groupList";
import api from "../api";
import SearchStatus from "./searchStatus";
import UsersTable from "./usersTable";
import userApi from "../api/fake.api/user.api";

const Users = () => {
 const [currentPage, setCurrentPage] = useState(1);
 const [professions, setProfessions] = useState();
 const [selectedProf, setSelectedProf] = useState();
 const [users, setUsers] = useState();
 const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
 const pageSize = 8;

 useEffect(() => {
  userApi.fetchAll().then((data) => setUsers(data));
 }, []);

 const handleDelete = (userId) => {
  setUsers(users.filter((user) => user._id !== userId));
 };
 const handleToggleBookMark = (id) => {
  setUsers(
   users.map((user) => {
    if (user._id === id) {
     return { ...user, bookmark: !user.bookmark };
    }
    return user;
   })
  );
 };

 useEffect(() => {
  api.professions.fetchAll().then((data) => setProfessions(data), []);
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
  setSortBy(item);
 };

 if (users) {
  const filteredUsersByProf = selectedProf
   ? users.filter(
      (user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf)
     )
   : users;

  const count = filteredUsersByProf.length;

  const sortedUsers = _.orderBy(
   filteredUsersByProf,
   [sortBy.path],
   [sortBy.order]
  );

  const userCrop = paginate(sortedUsers, currentPage, pageSize);
  return (
   <div className="d-flex">
    {professions && (
     <div className="d-flex flex-column flex-shrink-0 p-3">
      <GroupList
       selectedItem={selectedProf}
       item={professions}
       onItemSelect={handleProfessionSelect}
      />
      <button className="btn btn-secondary mt-2" onClick={clearFilter}>
       Очистить
      </button>
     </div>
    )}
    <div className="d-flex flex-column">
     <SearchStatus length={count} />
     {count > 0 && (
      <UsersTable
       users={userCrop}
       onSort={handleSort}
       onDelete={handleDelete}
       onToggleBookMark={handleToggleBookMark}
       selectedSort={sortBy}
      />
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
 }
 return "Loading...";
};

Users.propTypes = {
 users: PropTypes.array
};

export default Users;
