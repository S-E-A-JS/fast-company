import React, { useState } from 'react'
import { PropTypes } from 'prop-types'

const TableHeader = ( { onSort, selectedSort, columns } ) => {
  const [ sortedColumn, setSortedColumn ] = useState ( null )

  const handleSort = item => {
    setSortedColumn ( item )
    if ( selectedSort.path === item ) {
      onSort ( {
        ...selectedSort,
        order: selectedSort.order === 'asc'
          ? 'desc'
          : 'asc',
      } )
    } else {
      onSort ( { path: item, order: 'asc' } )
    }
  }

  return (
    <thead>
      <tr>
        {Object.keys ( columns ).map ( column => (
          <th
            key={column}
            onClick={
              columns[column].path
                ? () => handleSort ( columns[column].path )
                : undefined
            }
            {...{ role: columns[column].path && 'button' }}
            scope="col"
          >
            {columns[column].name}
            {columns[column].path === sortedColumn
              ? (
                <i
                  className={
                    selectedSort.order === 'asc'
                      ? 'bi bi-caret-up-fill'
                      : 'bi bi-caret-down-fill'
                  }
                ></i>
              )
              : null}
          </th>
        ) )}
      </tr>
    </thead>
  )
}

TableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired,
}

export default TableHeader