import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import api from '../api'

import Pagination from './pagination'
import { paginate } from '../utils/paginate'
import GroupList from './groupList'
import SearchStatus from './searchStatus'
import UserTable from './usersTable'
import SearchInput from './searchInput'

const UsersList = () => {
  const [ currentPage, setCurrentPage ] = useState ( 1 )
  const [ professions, setProfession ] = useState ()
  const [ selectedProf, setSelectedProf ] = useState ()
  const [ sortBy, setSortBy ] = useState ( {
    path: 'name',
    order: 'asc',
  } )
  const [ users, setUsers ] = useState ()
  const [ textState, setTextState ] = useState ( '' )
  const pageSize = 8

  useEffect ( () => {
    api.users.fetchAll ().then ( data => setUsers ( data ) )
  }, [] )
  const handleDelete = userId => {
    setUsers ( users.filter ( user => user._id !== userId ) )
  }
  const handleToggleBookMark = id => {
    const newArray = users.map ( user => {
      if ( user._id === id ) {
        return {
          ...user,
          bookmark: !user.bookmark,
        }
      }
      return user
    } )
    setUsers ( newArray )
  }

  useEffect ( () => {
    api.professions.fetchAll ().then ( data => setProfession ( data ) )
  }, [] )

  useEffect ( () => {
    setCurrentPage ( 1 )
  }, [ selectedProf ] )

  const handleProfessionSelect = item => {
    setSelectedProf ( item )
  }

  const handlePageChange = pageIndex => {
    setCurrentPage ( pageIndex )
  }
  const handleSort = item => {
    setSortBy ( item )
  }

  // для получения введенного текста из SearchInput
  const changeTextState = value => {
    setTextState ( value )
  }
  useEffect ( () => { // очиста фильтрации если SearchInput пуст
    if ( textState.searchData !== '' ) {
      setSelectedProf ()
    }
  }, [ textState ] )

  if ( users ) {
    const filteredUsers = selectedProf
      ? users.filter (
        user =>
          JSON.stringify ( user.profession ) ===
                      JSON.stringify ( selectedProf ),
      )
      : textState.searchData
        ? users.filter ( user => user.name.toLowerCase ().includes ( textState.searchData.toLowerCase () ) )
        : users

    const count = filteredUsers.length
    const sortedUsers = _.orderBy (
      filteredUsers,
      [ sortBy.path ],
      [ sortBy.order ],
    )
    const usersCrop = paginate ( sortedUsers, currentPage, pageSize )
    const clearFilter = () => {
      setSelectedProf ()
    }

    return (
      <div className="d-flex">
        {professions && (
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <GroupList
              selectedItem={selectedProf}
              items={professions}
              onItemSelect={handleProfessionSelect}
            />
            <button
              className="btn btn-secondary mt-2"
              onClick={clearFilter}
            >
              {' '}
                            Очистить
            </button>
          </div>
        )}
        <div className="d-flex flex-column">
          <SearchStatus length={count} />
          <SearchInput
            changeTextState={changeTextState}
            clearFilter={clearFilter}
            selectedItem={selectedProf}
          />
          {count > 0 && (
            <UserTable
              users={usersCrop}
              onSort={handleSort}
              selectedSort={sortBy}
              onDelete={handleDelete}
              onToggleBookMark={handleToggleBookMark}
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
    )
  }
  return 'loading...'
}
UsersList.propTypes = {
  users: PropTypes.array,
}

export default UsersList